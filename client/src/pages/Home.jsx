import React from "react";
import Navbar from "../components/Navbar/Navbar";
import home from "../assets/home.png";

const Home = () => {
    return (
        <>
            <img
                src={home}
                alt="home"
                style={{
                    float: "left",
                    width: "400px",
                    height: "400px",
                    marginRight: "20px",
                }}
            />
            <Navbar />
            <div
                style={{
                    maxWidth: "40%",
                    textAlign: "left",
                    paddingLeft: "1rem",
                    position: "absolute",
                    top: "50%",
                    right: "5%",
                    transform: "translateY(-50%)",
                    lineHeight: "1.75",
                }}
            >
                <p>
                    In Word-Rush, players can enjoy a thrilling word-guessing challenge. Compete with friends or strangers by guessing the secret word within a limited number of attempts. Each correct guess reveals the position of correct letters, making it progressively easier to deduce the word. The games interactive and engaging interface keeps players on their toes as they try to outwit their opponents and showcase their speed. Get ready for an exciting word-solving adventure that brings out the best wordsmith in you!
                </p>
                <p>
                    Unleash your word-guessing skills and savor the thrilling journey of Word-Rush!
                </p>
            </div>
        </>
    );
};

export default Home;
