// const belvo = require("belvo").default;
// require("dotenv").config();

// async function requestAccessToken() {
//   return fetch(`https://api-belvo-staging.herokuapp.com/api/v1/belvo/token`, {
//     method: 'GET',
//   })
//     .then((response) => response.json())
//     .catch((error) => console.error('Error:', error));
// }

// (async () => {
//   console.log('a');
//   const secretKey = await requestAccessToken();
//   console.log('b');

//   const client = new belvo(
//     process.env.KEY_ID,
//     secretKey,
//     "http://localhost:4200/"
//   );

//   // Widget branding
//   const widget = {
//     branding: {
//       company_icon: "",
//       company_logo: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
//       company_name: "Ottimizza",
//       // company_benefit_header: "Faster approvals",
//       // company_benefit_content:
//       //   "Using Belvo cuts down on your loan approval time by up to 15 days.",
//       // opportunity_loss:
//       //   "It can take up to 20 days to evaluate your request using traditional methods.",
//     },
//   };

//   const options = {
//     scopes: "read_institutions,write_links,read_links",
//     widget: widget,
//   };
//   client.connect().then(function () {
//     client.widgetToken
//       .create(options)
//       .then((response) => {
//         res.json(response);
//       })
//       .catch((error) => {
//         res.status(500).send({
//           message: error.message,
//         });
//       });
//   });
// })();
