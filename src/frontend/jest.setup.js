import { enableAutoDestroy } from "@vue/test-utils";
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

enableAutoDestroy(global.afterEach);
registerRequireContextHook();
