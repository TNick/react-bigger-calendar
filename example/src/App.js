import React from 'react'
import lodashGet from 'lodash/get';
import startOfToday from 'date-fns/startOfToday'
import { createMuiTheme } from '@material-ui/core/styles';
import { orange, red } from '@material-ui/core/colors';

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

const theme = createMuiTheme({
  calendar: {
    activeDay: {
      color: "primary.main",
      backgroundColor: red[50]
    },
    inactiveDay: {
      color: "text.secondary",
      backgroundColor: "background.paper"
    },
    selectedDay: {
      color: orange[500],
      backgroundColor: orange[100]
    },
  }
})

const today = startOfToday()
const App = () => {
  return (
    <Calendar
      dataProvider={dataProvider} 
      i18nProvider={i18nProvider}
      initialCurrentDate={today}
      initialStartDate={today}
      initialViewMode="day"
      theme={theme}
    />
  )
}

export default App
