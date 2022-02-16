import React from "react";

export default function Mem(){
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemeImages, setAllMemeImages] = React.useState([])
    
    function handleClick(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }

    React.useEffect(function(){
fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemeImages(data.data.memes))
}, [])
    return(
        
            <div className="main-container">
                
                <div className="form">
                    <div className="inputs-box">
                      
                      <input className="input" 
                      placeholder="Setup" 
                      type="text" 
                      name="topText" 
                      value={meme.topText}
                      onChange={handleClick}
                      id="setup" 
                      />
                      
                      <input className="input"  
                      placeholder="Punchline" 
                      type="text" 
                      name="bottomText"
                      value={meme.bottomText}
                      onChange={handleClick} 
                      id="punchline" 
                      />

                    </div>
                    <button className="makeMem" onClick={getMemeImage}>Get a new meme image  🖼</button>
                    <div className="meme">
                        <img src={meme.randomImage} className="meme--image" alt="meme" />
                        <h2 className="meme-text top">{meme.topText}</h2>
                        <h2 className="meme-text bottom">{meme.bottomText}</h2>

                    </div>
                    
                </div>
               
            </div>
        
    )
}
