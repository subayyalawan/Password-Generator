import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setlength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  // to generate random passwords
  const handleGeneratePass = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVUXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "123456789";
    if (charAllowed) str += "@!_-&$*";

    for (let i = 0; i < length; i++) {
      let randomIdx = Math.floor(Math.random() * str.length);
      pass += str[randomIdx];
    }

    setPassword(pass);
  }, [password, length, charAllowed, numAllowed, setPassword]);

  // to call the function on different changes
  useEffect(() => {
    handleGeneratePass();
  }, [charAllowed, numAllowed, setPassword, length]);

  const handleCopyPass = () => {
    navigator.clipboard.writeText(password);
    alert("Password Copy to the Clipboard");
    passwordRef.current.select();
  };
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="lg:w-3/5  md:w-4/5 w-full p-10 bg-gray-700 rounded-xl">
          <h1 className="md:text-3xl text-xl text-center font-bold mb-5">
            Password Generator
          </h1>
          <div className="p-1 bg-white rounded-lg flex">
            <input
              type="text"
              className="px-2 py-2 outline-none text-gray-900 w-full"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-green-700 capitalize px-4 py-2 rounded-md font-bold hover:bg-green-800 cursor-pointer"
              onClick={handleCopyPass}
            >
              Copy
            </button>
          </div>
          <div className="flex justify-between md:mx-5 mt-5">
            <div className="flex items-center md:justify-start justify-center flex-wrap md:w-1/5 w-2/5">
              <input
                type="range"
                min={5}
                max={50}
                value={length}
                onChange={(e) => setlength(Number(e.target.value))}
                id="passLength"
                className=" accent-green-700 hover:accent-green-800 w-full"
              />
              <label
                htmlFor="passLength"
                className="text-base capitalize text-center md:text-left"
              >
                password Length ({length})
              </label>
            </div>

            <div className="flex items-center md:justify-start justify-center w-1/5 flex-wrap">
              <input
                type="checkbox"
                id="charAllow"
                className="accent-green-700 md:mr-2"
                value={charAllowed}
                onClick={() => setCharAllowed(!charAllowed)}
              />
              <label
                htmlFor="charAllow"
                className=" text-center md:text-left capitalize"
              >
                Character Allowed
              </label>
            </div>

            <div className="flex items-center w-1/5 flex-wrap md:justify-start justify-center">
              
              <input
                type="checkbox"
                id="numAllow"
                className="accent-green-700 md:mr-2"
                value={numAllowed}
                onClick={() => setNumAllowed(!numAllowed)}
              />
              <label
                htmlFor="numAllow"
                className=" text-center md:text-left capitalize"
              >
                Number Allowed
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
