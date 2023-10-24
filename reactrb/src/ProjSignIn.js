import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

function ProjSignin() {
    const [inputName, setName] = useState('');
    const [inputDesc, setDesc] = useState('');
    const [inputProjID, setProjID] = useState('');
    const [existProjID, setExistID] = useState('');
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const {state} = useLocation();
    const {list} = state;
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };

    const handleProjIDChange = (event) => {
        setProjID(event.target.value);
    };

    const handleExistIDChange = (event) => {
        setExistID(event.target.value);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputName, inputDesc, inputProjID }),
        }
        fetch('/dashboard/create', requestData)
        .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data)
            if(data.code == 400){
                setErrMessage("The project with " + inputProjID + " already exists!")
            }
            setError(true)
        });
    };

    const handleExistSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ existProjID }),
        }
        fetch('/dashboard/join', requestData)

        .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data)
            if(data.code == 400){
                if(data.message == "project_not_found"){
                    setErrMessage("Project doesn't exist!")
                }
                else{
                    setErrMessage(existProjID + " is incorrect!")
                }
            }
        });
    };

    const projectDisp = () => {
        return Object.keys(list).map((obj, i) => {
            return (
                <div>
                    name is: {list[obj].name} ;
                    hardware1 is: {list[obj].hardware1};
                    hardware2 is: {list[obj].hardware2}
                </div>
            )
        })
    } 

    const errorMessage = () => {
        return(
            <div style={{
                display: error ? '' : 'none',
            }}>
                <p>{errMessage}</p>
            </div>
        )
    }

    return (
        <div>
            <div>
                <h1>Create New Project</h1>
                <form onSubmit={handleCreateSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                        type="text"
                        value={inputName}
                        onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <input
                        type="text"
                        value={inputDesc}
                        onChange={handleDescChange}
                        />
                    </div>
                    <div>
                        <label>ProjectID</label>
                        <input
                        type="text"
                        value={inputProjID}
                        onChange={handleProjIDChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Create Project</button>
                    </div>
                </form>
            </div>
            <h2>Or</h2>
            <div>
                <h1>Use Existing Project</h1>
                <form onSubmit={handleExistSubmit}>
                    <div>
                        <label>ProjectID</label>
                        <input
                        type="text"
                        value={existProjID}
                        onChange={handleExistIDChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Sign In</button>
                    </div>
                </form>
            </div>
            <div>
                {projectDisp()}
            </div>
            <div>
                {errorMessage()}
            </div>
        </div>
    )
}

export default ProjSignin;