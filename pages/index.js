import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
 
  const [priceMin, setpriceMin] = useState(10);
  const [priceMax, setpriceMax] = useState(99999);
  const [gender, setgender] = useState("");
  const [age, setage] = useState(5);
  const [hobbies, sethobbies] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);


  // async function onSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch("/api/generate-gifts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ animal: giftInput }),
  //     });

  //     const data = await response.json();
  //     if (response.status !== 200) {
  //       throw data.error || new Error(`Request failed with status ${response.status}`);
  //     }

  //     setResult(data.result);
  //     setGiftInput("");

  //   } catch(error) {
  //     // Consider implementing your own error handling logic here
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }

  const onSubmit = async (event) => {
    event.preventDefault();
    if(loading){
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/generate-gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies  }),
      });
  
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log("result=========>",result)
      setResult(data.result.replaceAll("\n","<br />"));
      setLoading(false)
  
    } catch(error) {
     
      console.error(error);
      alert(error.message);
    }
  };
  


  return (
    <div>
      <Head>
        <title>Gifts</title>
        <link rel="icon" href="/diya.png" />
      </Head>

      <main className={styles.main}>
   
        <h3>🎁 Gifts Generator 🎁</h3>
        <form onSubmit={onSubmit}>
        <label>Minimum Price</label>
          <input
            type="number"
            name="priceMin"
            placeholder="Enter Minimum Price"
            value={priceMin}
            onChange={(e) => setpriceMin(e.target.value)}
          />
          <label>Maximum Price</label>
          <input
            type="number"
            name="priceMax"
            placeholder="Enter Maximum Price"
            value={priceMax}
            onChange={(e) => setpriceMax(e.target.value)}
          />
          <label>Gender</label>
          {/* <input
            type="text"
            name="gender"
            placeholder="Enter Gender"
            value={gender}
            onChange={(e) => setgender(e.target.value)}
            style={{marginBottom:0}}
          /> */}
          <select
          name="gender"
          value={gender}
          onChange={(e) => setgender(e.target.value)}
          >
            <option value = "male">Male</option>
            <option value = "female">Female</option>
          </select>
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
          <label>Hobbies</label>
          <input
            type="text"
            name="hobbies"
            placeholder="Enter Hobbies"
            value={hobbies}
            onChange={(e) => sethobbies(e.target.value)}
            style={{marginBottom:"50px"}}
          />
          
          <input type="submit" value="Generate gifts" />
        </form>
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* <h3>Looking for the best gift ideas 🎁 💡</h3> */}
            <img src="/loading.gif" className={styles.loading}  style={{ width: '100px', height: '100px' }}/>
          </div>
        )}
        {result &&  <div className={styles.result} style={{marginTop:0}} dangerouslySetInnerHTML={{ __html: result}} />}
       
      </main>
    </div>
  );
}
