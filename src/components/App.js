import React, {useState} from "react";
import '../styles/App.css';

const arr = ["Friends", "Love", "Affection", "Marriage", "Enemy", "Siblings"];

const App = () =>{

    const[name1, setName1] = useState("")
    const[name2, setName2] = useState("")
    const[output, setOutput] = useState("")

    const calculateRelationShip = () =>{

        if(name1.trim() === "" || name2.trim() === ""){
            setOutput("Please Enter valid input")
            return
        }

        let map1 = new Map();
        let map2 = new Map();
    
        // Create frequency map for name1
        for(let i = 0; i < name1.length; i++){
            map1.set(name1[i], (map1.get(name1[i]) || 0) + 1);
        }
    
        // Create frequency map for name2
        for(let i = 0; i < name2.length; i++){
            map2.set(name2[i], (map2.get(name2[i]) || 0) + 1);
        }
    
        // Remove common characters
        for(let [char, count] of map1){
            if(map2.has(char)){
                let minCount = Math.min(count, map2.get(char));
                map1.set(char, count - minCount);
                map2.set(char, map2.get(char) - minCount);
            }
        }
    
        // Calculate the length of remaining characters in both maps
        let remainingLength1 = 0;
        for(let count of map1.values()){
            remainingLength1 += count;
        }
    
        let remainingLength2 = 0;
        for(let count of map2.values()){
            remainingLength2 += count;
        }
    
        let totalRemainingLength = remainingLength1 + remainingLength2;
        let mod = totalRemainingLength % 6;

        let status = arr[mod-1];
        return setOutput(status);
    }

    const ClearState = () =>{
        setName1("")
        setName2("")
        setOutput("")
    }
 
        return(
            <div id="main">
                <input type="text" value={name1} onChange={(e) => setName1(e.target.value)} data-testid="input1" placeholder="Enter first name" name="name1"/>
                <input type="text" value={name2} onChange={(e) => setName2(e.target.value)} data-testid="input2" placeholder="Enter Second name" name="name2"/>
                <button onClick={calculateRelationShip} data-testid="calculate_relationship">Calculate RelationShip Future</button>
                <button onClick={ClearState} data-testid="clear">Clear</button>
                <h3 data-testid="answer" >{output}</h3>
            </div>
        )
}


export default App;
