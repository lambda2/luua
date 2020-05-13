import { configure } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import { setConfig } from 'next/config'
import { publicRuntimeConfig } from './next.config'

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig })

configure({ adapter: new ReactSixteenAdapter() });
