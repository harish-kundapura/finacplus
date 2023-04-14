import axios from "axios";


//! API FOR GETTING ALL DOMAIN TYPE OR CATEGORY LIST (6)
const GetUserDetails = async () => {
  try {
    
    const res = await axios.get(
      `https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9`,
      
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { GetUserDetails };
