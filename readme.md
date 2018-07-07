## Node Avatar API ##

This API is implemented on Node.JS platform using typescript.

  1. Endpoints

    1.0 Technical

        - GET : / => returns metadata about API
        - GET : /health => returns stringy "Healthy"

    1.1 Operational

        - GET : /v1/avatar => Accepts name & gender as obligatory query parameters and directly returns SVG generated based on input
        - GET : /v1/avatar/json => Requires same query parameters as previous endpoint, returns JSON response with generated SVG as string in data property.
        - POST: /v1/avatar/json => Requires json input of form: {id: number, gender: string, name: string}. Generates a svg based on input
                                 and saves it as users new Avatar.

  2. Dependencies

  A global nodemon dependency should be installed via: `npm install -g nodemon`.

  3. Testing

  Test are placed and implemented inside test folder. They can be run in project run via command: `npm run test`

  3. Developement and deployment

  After nodemon installation application is run by executin `nodemon` command.
  For deployment application should be compiled via `npm run build`. Production output is put inside dist folder.

