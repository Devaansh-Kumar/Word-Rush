import React from "react";
import Navbar from "../components/Navbar/Navbar";
import home from "../assets/home.png";

const Home = () => {
  return (
    <>
      <Navbar />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Edu+SA+Beginner:wght@400;500;600&display=swap');
      </style>
      <div style={{ display: "flex", alignItems: "center", maxWidth: "90%", margin: "0 auto" }}>
        <img
          src={home}
          alt="home"
          style={{ width: "400px", height: "400px", maxWidth: "50%", marginRight: "20px" }}
        />
        <div
          style={{
            fontFamily: "'Edu SA Beginner', cursive",
            fontSize: "18px", 
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ lineHeight: "2" }}>
            In Word-Rush, players can enjoy a captivating word-guessing challenge.
            Compete with friends or strangers by guessing the secret word within
            a limited number of attempts. Each correct guess reveals the
            position of correct letters, making it progressively easier to
            deduce the word. The game's interactive and engaging interface keeps
            players on their toes as they try to outwit their opponents and
            showcase their speed. Get ready for an exciting word-solving
            adventure that brings out the wordsmith in you!
          </p>
          <p style={{ lineHeight: "2" }}>
            Unleash your word-guessing skills and savor the journey of Word-Rush!
            With a plethora of challenging levels, Word-Rush will put your vocabulary
            and wit to the ultimate test. Can you decipher the trickiest words under pressure?
            Embark on this lexical adventure and let the word-guessing frenzy begin!
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
