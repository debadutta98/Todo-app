import { createContext, useContext, useState } from "react"

const context = createContext({
    darkMode: false,
    onChangeMode: ()=> undefined
});

export const useChangeMode = () => useContext(context);

export default function Provider ({children}) {
    const [mode, setMode] = useState(false);
    return <context.Provider value={{
        darkMode: mode,
        onChangeMode: ()=> setMode(!mode)
    }}>
        {children}
    </context.Provider>
};
