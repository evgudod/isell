import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import RubricatorBuilder from './Admin/RubricatorBuilder';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
         <RubricatorBuilder name={"Evgen"} />
        , document.getElementById('root')

);
registerServiceWorker();
