import React from 'react'

const Loader = () => {
    return (
        <div class="w-full h-screen flex flex-row gap-2  justify-center items-center">
            <div class="w-6 h-6 rounded-full bg-slate-800 animate-bounce"></div>
            <div class="w-6 h-6 rounded-full bg-slate-800 animate-bounce [animation-delay:-.3s]"></div>
            <div class="w-6 h-6 rounded-full bg-slate-800 animate-bounce [animation-delay:-.5s]"></div>
        </div>
    )
}

export default Loader