import React from 'react'
import lodashGet from 'lodash/get';

import Calendar, { englishMessages, mergeTranslations } from 'react-bigger-calendar'

const dataProvider = {

};

const myEnglishMessages = {
  my: {
    english: {
      messages: '123'
    }
  }
}

let messages = englishMessages;
let locale = 'en';

const i18nProvider = {
    translate: key => lodashGet(messages, key),
    changeLocale: newLocale => {
        messages = mergeTranslations(englishMessages, myEnglishMessages);
        locale = newLocale;
        return Promise.resolve();
    },
    getLocale: () => locale
};


const App = () => {
  return <Calendar dataProvider={dataProvider} i18nProvider={i18nProvider}/>
}

export default App
