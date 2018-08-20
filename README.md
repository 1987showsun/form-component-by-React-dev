# React Form Component

## npm
```sh
  npm i react-form-beta
```

## Links
<a href="https://github.com/1987showsun/form-component-by-React-dev">GitHub</a>
<a href="https://www.npmjs.com/package/react-form-beta">NPM</a>

## Demo
<a href="https://1987showsun.github.io/form-component-by-React-dev/">Demo</a>

## Use direction Object

```js
  [
    {
      "type"        : "text",                   // html input type  ex: text / password / number / mail / radio / textarea / select / date / multiple / file
      "name"        : "username",               // html input name , only name
      "value"       : "sun",                    // html input value , init value null ; When type is equal to multiple is Object
      "data"        : [],                       // type select / multiple / radio , option's data 
      "label"       : "Username",               // html input label , no label input width 100%
      "placeholder" : "please input your name", // html input placeholder , init null
      "required"    : {
        "switch"       : false / true,
        "msg"          : ""
      },                    // html input required "trun / false",
      "showTime"    : false,                    // for type date , time show / hide
      "children"    : []                        // only type select 
    },
    { ... },
    {
      "type"        : "select",                 // html input type  ex: text / password / number / mail / radio / textarea / select / date / multiple / file
      "name"        : "like",                   // html input name , only name
      "value"       : [
        {
          "value"     : "1",
          "name"      : "selected name"
        },
        {...},
        {
          "value"     : "n",
          "name"      : "selected name"
        }
      ],                    // html input value , init value null ; When type is equal to multiple is Object
      "data"        : [
        {
          "value"     : "1",
          "name"      : "option name"
        },
        {...},
        {
          "value"     : "n",
          "name"      : "option name"
        }
      ],                       // type select / multiple / radio , option's data 
      "label"       : "Username",               // html input label , no label input width 100%
      "placeholder" : "please input your name", // html input placeholder , init null
      "required"    : {
        "switch"       : false / true,
        "msg"          : ""
      },                    // html input required "trun / false",
      "showTime"    : false,                    // for type date , time show / hide
      "children"    : []                        // only type select 
    }
  ]
```

### Api key children
```js
  children : [
    {
      "key"         : "",                       // correspond type:select selected value 
      "type"        : "text",                   // html input type Ex: text / password / number / mail / radio / textarea / select / date / multiple
      "name"        : "username",               // html input name , only name
      "value"       : "sun",                    // html input value , init value null ; When type is equal to multiple is Object
      "data"        : [],                       // type select / multiple / radio , option's data 
      "label"       : "Username",               // html input label , no label input width 100%
      "placeholder" : "please input your name", // html input placeholder , init null
      "required"    : {
        "switch"       : false / true,
        "msg"          : ""
      },                    // html input required "trun / false"
      "showTime"    : false                     // for type date , time show / hide
    }
  ]
```

## Use direction component
```js 
  import Form from react-form-beta;

  testMultipleSearch( string ){
    console.log( string );
  }

  testResult( object ){
    console.log( object );
  }

  testCancel(){
    //cancel function action
  }

  <Form
    data             = { this.state.form }                     // form object setup data
    multipleSearch   = { this.testMultipleSearch.bind(this) }  // multiple return search value call ajax
    result           = { this.testResult.bind(this) }          // form result
    cancel           = { this.testCancel.bind(this) }          // from cancel 
  />
```


## Use direction Object Api
| Api                     | type                       | method                                                                                              |
|-------------------------|----------------------------|-----------------------------------------------------------------------------------------------------|
| type                    | string                     | type       : "text / password / number / mail / radio / textarea / select / date / multiple / file" |
| name                    | string                     | name       : "input name (only))"                                                                   |
| value                   | string / Object            | value      : "test value" / [{ "value":"", "name":"" }]                                             |
| data                    | Object                     | data       : [{ "value":"", "name":"" }]                                                            |
| label                   | string                     | label      : "input label"                                                                          |
| placeholder             | string                     | placeholder: "input placeholder"                                                                    |
| required                | Object                     | required   : { "switch": false, "msg": "" } / { "switch": true, "msg": "" }                         |
| showTime                | boolean                    | showTime   : true / false                                                                           |
| children                | Object                     | children   : [{<br/> "key": "",<br/> "type":"",<br/> "name":"",<br/> "value":[{}]/"",<br/> "data":[{}],<br/> "label":"",<br/> "placeholder":"",<br/> "required": true/false,<br/> "showTime":true/false<br/> }]|