import React from 'react';
import { RichUtils, Modifier, EditorState, SelectionState } from 'draft-js';
import { ContentState } from 'react-draft-wysiwyg';
import { isURL, formatUrl } from 'utils/link';


/*
Function you can call from your toolbar or "link button" to manually linkify
the selected text with an "explicit" flag that prevents autolinking from
changing the URL if the user changes the link text.
*/
export function editorStateSettingExplicitLink(editorState: any, urlOrNull: any) {
  return editorStateSettingLink(editorState, editorState.getSelection(), {
    url: urlOrNull,
    explicit: true,
  });
}

/*
Returns editor state with a link entity created / updated to hold the link @data
for the range specified by @selection
*/
export function editorStateSettingLink(editorState: EditorState, selection: SelectionState, data: { url: any; explicit: boolean; }) {
  const contentState = editorState.getCurrentContent();
  const entityKey = getCurrentLinkEntityKey(editorState);

  let nextEditorState = editorState;

  if (!entityKey) {
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', data);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    nextEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    nextEditorState = RichUtils.toggleLink(nextEditorState, selection, entityKey);
  } else {
    nextEditorState = EditorState.set(editorState, {
      currentContent: editorState.getCurrentContent().replaceEntityData(entityKey, data),
    });
    // this is a hack that forces the editor to update
    // https://github.com/facebook/draft-js/issues/1047
    nextEditorState = EditorState.forceSelection(nextEditorState, editorState.getSelection());
  }

  return nextEditorState;
}

/*
Returns the entityKey for the link entity the user is currently within.
*/
export function getCurrentLinkEntityKey(editorState: EditorState) {
  const contentState = editorState.getCurrentContent();
  const startKey = editorState.getSelection().getStartKey();
  const startOffset = editorState.getSelection().getStartOffset();
  const block = contentState.getBlockForKey(startKey);
  const linkKey = block.getEntityAt(Math.min(block.getText().length - 1, startOffset));

  if (linkKey) {
    const linkInstance = contentState.getEntity(linkKey);
    if (linkInstance.getType() === 'LINK') {
      return linkKey;
    }
  }
  return null;
}

/*
Returns the URL for the link entity the user is currently within.
*/
export function getCurrentLink(editorState: EditorState) {
  const entityKey = getCurrentLinkEntityKey(editorState);
  return (
    entityKey &&
    editorState
      .getCurrentContent()
      .getEntity(entityKey)
      .getData().url
  );
}

const createLinkifyPlugin = () => {
  const Link = (props: { data: any; contentState: ContentState; entityKey: any; children: {} | null | undefined; }) => {
    const data = props.data || props.contentState.getEntity(props.entityKey).getData();
    const { url } = data;
    if (!url) {
      return <span>{props.children}</span>;
    }
    return (
      <a href={url} title={url}>
        {props.children}
      </a>
    );
  };

  function findLinkEntities(contentBlock: { findEntityRanges: (arg0: (character: any) => any, arg1: any) => void; }, callback: any, contentState: { getEntity: (arg0: any) => any; }) {
    contentBlock.findEntityRanges((character: { getEntity: () => any; }) => {
      const entityKey = character.getEntity();
      if (!entityKey) return;

      const entity = contentState.getEntity(entityKey);
      return entity.getType() === 'LINK' && entity.getData().url;
    }, callback);
  }

  return {
    decorators: [
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ],
    onChange: (editorState: EditorState) => {
      /* This method is called as you edit content in the Editor. We use
      some basic logic to keep the LINK entity in sync with the user's text
      and typing.
      */
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      if (!selection || !selection.isCollapsed()) {
        return editorState;
      }

      const cursorOffset = selection.getStartOffset();
      const cursorBlockKey = selection.getStartKey();
      const cursorBlock = contentState.getBlockForKey(cursorBlockKey);
      if (cursorBlock.getType() !== 'unstyled') {
        return editorState;
      }

      // Step 1: Get the word around the cursor by splitting the current block's text
      const text = cursorBlock.getText();
      const currentWordStart = text.lastIndexOf(' ', cursorOffset) + 1;
      let currentWordEnd = text.indexOf(' ', cursorOffset);
      if (currentWordEnd === -1) {
        currentWordEnd = text.length;
      }
      const currentWord = text.substr(currentWordStart, currentWordEnd - currentWordStart);
      const currentWordIsURL = isURL(currentWord);

      // Step 2: Find the existing LINK entity beneath the user's cursor
      let currentLinkEntityKey: string | null = cursorBlock.getEntityAt(Math.min(text.length - 1, cursorOffset));
      const inst = currentLinkEntityKey && contentState.getEntity(currentLinkEntityKey);
      if (inst && inst.getType() !== 'LINK') {
        currentLinkEntityKey = null;
      }

      if (currentLinkEntityKey) {
        // Note: we don't touch link values added / removed "explicitly" via the link
        // toolbar button. This means you can make a link with text that doesn't match the link.
        const entityExistingData = contentState.getEntity(currentLinkEntityKey).getData();
        if (entityExistingData.explicit) {
          return editorState;
        }

        if (currentWordIsURL) {
          // We are modifying the URL - update the entity to reflect the current text
          const contentState = editorState.getCurrentContent();
          return EditorState.set(editorState, {
            currentContent: contentState.replaceEntityData(currentLinkEntityKey, {
              explicit: false,
              url: formatUrl(currentWord),
            }),
          });
        } else {
          // We are no longer in a URL but the entity is still present. Remove it from
          // the current character so the linkifying "ends".
          const entityRange = new SelectionState({
            anchorOffset: currentWordStart - 1,
            anchorKey: cursorBlockKey,
            focusOffset: currentWordStart,
            focusKey: cursorBlockKey,
            isBackward: false,
            hasFocus: true,
          });
          return EditorState.set(editorState, {
            currentContent: Modifier.applyEntity(
              editorState.getCurrentContent(),
              entityRange,
              null
            ),
          });
        }
      }

      // There is no entity beneath the current word, but it looks like a URL. Linkify it!
      if (!currentLinkEntityKey && currentWordIsURL) {
        const entityRange = new SelectionState({
          anchorOffset: currentWordStart,
          anchorKey: cursorBlockKey,
          focusOffset: currentWordEnd,
          focusKey: cursorBlockKey,
          isBackward: false,
          hasFocus: false,
        });
        let newEditorState = editorStateSettingLink(editorState, entityRange, {
          explicit: false,
          url: formatUrl(currentWord),
        });

        // reset selection to the initial cursor to avoid selecting the entire links
        newEditorState = EditorState.acceptSelection(newEditorState, selection);
        return newEditorState;
      }

      return editorState;
    },
  };
};

export default createLinkifyPlugin;