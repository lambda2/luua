import Hero from "elements/Hero/Hero";
import SignupForm from "components/SignupForm/SignupForm";
import { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import ROUTES from "routes/routes";

type PersonaChoice = 'association' | 'project' | 'individual'

const HomeContent = () => {

  const [persona, setPersona] = useState<PersonaChoice>('association')

  return (<div className="HomePageContent">
    <div className="main-content">
      <Hero>
        <main>
          <p className="suptitle">Luua</p>
          <h1>Créez, ensemble.</h1>
          <p className="subtitle">
            Luua est une plateforme pour construire et faire avancer les projets de demain, avec la communauté.
          </p>
          {/* <footer>
            <Link {...ROUTES.users.signup()}>
              <a className="hero-link">Créer mon compte</a>
            </Link>
            <p className="little-text">
              Gratuit et{' '}
              <a rel="noopener" target="_blank" href="https://github.com/lambda2/luua">libre</a></p>
          </footer> */}
        </main>
        <aside>
          <SignupForm />
        </aside>
      </Hero>
    </div>
    {/* <div className="sub-content">
      <ul className="point-list">
        <li>
          <h2>Échangez</h2>
          <p>Discutez et débattez de tout et n'importe quoi, en public ou en privé</p>
        </li>
        <li>
          <h2>Décidez</h2>
          <p>Prenez des décisions, de manière collective et sécurisée, selon vos règles</p>
        </li>
        <li>
          <h2>Agissez</h2>
          <p>Proposez des missions, à vos membres ou à la communauté toute entière, pour faire avancer votre projet</p>
        </li>
      </ul>
    </div> */}

    <div className="persona-selector">
      <p className="text-centered">Je suis...</p>
      <div className="selector-buttons">
        <a className={classNames({active: persona === 'association'})} onClick={() => setPersona('association')}>Une association</a>
        <a className={classNames({active: persona === 'individual'})} onClick={() => setPersona('individual')}>Un particulier</a>
        <a className={classNames({active: persona === 'project'})} onClick={() => setPersona('project')}>Un porteur de projet</a>
      </div>
    </div>
    <div className={classNames('sub-content persona-item', { active: persona === 'association' })}>
      <Hero>
        <main>
          <h2>Pour les associations</h2>
        </main>
        <aside>
          <ul className="bullet-list">
            <li>
              <h3>Trouvez des bénévoles</h3>
              <p>Proposez des missions ponctuelles, en ligne ou sur le terrain.</p>
            </li>
            <li>
              <h3>Suivez vos actions</h3>
              <p>Gérez vos missions, vos membres et vos candidats, du début à la fin.</p>
            </li>
            <li>
              <h3>Discutez des problèmes</h3>
              <p>Prenez des décisions, de manière collective et sécurisée, selon vos règles.</p>
            </li>
          </ul>

        </aside>
      </Hero>
    </div>
    <div className={classNames('sub-content persona-item', { active: persona === 'individual' })}>
      <Hero>
        <main>
          <h2>Pour les particuliers</h2>
        </main>
        <aside>
          <ul className="bullet-list">
            <li>
              <h3>Prenez part à des projets qui vous correspondent</h3>
              <p>Parcourez les espaces existants, ou créez le votre.</p>
            </li>
            <li>
              <h3>Mettez vos talents au service de la communauté</h3>
              <p>Trouvez des missions en accord avec vos compétences.</p>
            </li>
            <li>
              <h3>Soutenez les initiatives</h3>
              <p>???.</p>
            </li>
          </ul>
        </aside>
      </Hero>
    </div>
    <div className={classNames('sub-content persona-item', { active: persona === 'project' })}>
      <Hero>
        <main>
          <h2>Pour les porteurs de projet</h2>
        </main>
        <aside>
          <ul className="bullet-list">
            <li>
              <h3>Communiquez sur votre projet</h3>
              <p>Partagez (ou pas) votre vision, vos challenges et votre feuille de route.</p>
            </li>
            <li>
              <h3>Récoltez des avis</h3>
              <p>Ouvrez des discussions, partagez votre feuille de route, et comprenez ce qui est vraiment important.</p>
            </li>
            <li>
              <h3>Soyez accompagné</h3>
              <p>Demandez des conseils et proposez des missions sur des sujets spécifiques.</p>
            </li>
          </ul>
        </aside>
      </Hero>
    </div>

  </div>)
}

export default HomeContent