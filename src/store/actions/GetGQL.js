export const backURL = "http://localhost:4000";

const getGQL =
  (url) =>
  async (query, variables = {}) => {
    let obj = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
    let a = await obj.json();
    if (!a.data && a.errors) throw new Error(JSON.stringify(a.errors));
    return a.data[Object.keys(a.data)[0]];
  };

export const gql = getGQL(backURL);

export const actionGetCats = () =>
  gql(`query {
    categories {
      name 
    }
  }`);

export const actionGetCat = (cat) =>
  gql(
    `query cat($q: String!) {
      category(input: {title: $q}) {
        name products {
        id name inStock gallery description category attributes {
           name
          } prices {
           currency {
             label symbol 
           } amount  
         } brand
        }
      }
    }
   `,
    { q: cat }
  );

export const getCat = (cat) => async (dispatch) => {
  await actionGetCat(cat).then((data) =>
    dispatch({
      type: "GET_CAT",
      payload: data,
    })
  );
};

export const actionGetGood = (goodId) =>
  gql(
    `query good($q: String!) {
      product(id: $q){
        id name inStock gallery description category attributes {
           name
          } prices {
           currency {
             label symbol 
           } amount  
         } brand
        }
    }
   `,
    { q: goodId }
  );

export const getGood = (goodId) => async (dispatch) => {
  await actionGetGood(goodId).then((data) =>
    dispatch({
      type: "GET_GOOD",
      payload: data,
    })
  );
};
