"use client"
import Image from "next/image"

import getRandomInteger from "@/utils/getRandomInteger"
import { useEffect, useState } from "react"
import FlippingCard from "./card"
const Game = () => {
    const [first, setFirst] = useState(0)
    const [second, setSecond] = useState(0)
    const [chance, setChance] = useState(1)
    const [result, setResult] = useState("")
    const [selected, setSelected] = useState("")
    const [isFlipped, setIsFlipped] = useState(false)

    const changeCard = () => {
        const getRandomNumber = getRandomInteger(1, chance)
        const getGuessRandomNumber = getRandomInteger(1, chance)
        const newFirst = getRandomInteger(2, 13)
        const newSecond = getRandomInteger(1, newFirst - 1)
        if (getRandomNumber !== getGuessRandomNumber) {
            if (selected === "first") {
                setFirst(Math.min(newFirst, newSecond))
                setSecond(Math.max(newFirst, newSecond))
            } else {
                setFirst(Math.max(newFirst, newSecond))
                setSecond(Math.min(newFirst, newSecond))
            }
        } else {
            if (selected === "first") {
                setFirst(Math.max(newFirst, newSecond))
                setSecond(Math.min(newFirst, newSecond))
            } else if (selected === "second") {
                setFirst(Math.min(newFirst, newSecond))
                setSecond(Math.max(newFirst, newSecond))
            }
        }
    }

    const handleGuess = () => {
        if (!selected) return
        changeCard()
        setIsFlipped(true)
    }

    const handleRetry = () => {
        setIsFlipped(false)
        setSelected("")
        setResult("")
    }

    useEffect(() => {
        if (first === second) {
            setResult("")
            return
        }
        if ((first > second && selected === "first") || (second > first && selected === "second")) {
            setResult("you win")
        } else {
            setResult("you lose")
        }
        setChance(getRandomInteger(1, 100))
    }, [first, second])
    return (
        <main className="flex min-h-screen flex-col gap-16 justify-center items-center w-full ">
            <h1 className="font-bold text-4xl">card game</h1>
            <h3 className="font-bold text-2xl">which card is higher?</h3>
            <div className="flex gap-16">
                <div
                    onClick={() => setSelected("first")}
                    className={`${
                        selected === "first" ? "border-black border-2 transition-all" : ""
                    }`}
                >
                    <FlippingCard
                        frontContent={<Image src="/back.jpeg" fill alt="back image" />}
                        backContent={<Image src={`/${first}.png`} fill alt="back image" />}
                        isFlipped={isFlipped}
                    />
                </div>
                <div
                    onClick={() => setSelected("second")}
                    className={`${
                        selected === "second" ? "border-black border-2 transition-all" : ""
                    }`}
                >
                    <FlippingCard
                        frontContent={<Image src="/back.jpeg" fill alt="back image" />}
                        backContent={<Image src={`/${second}.png`} fill alt={`${second}`} />}
                        isFlipped={isFlipped}
                    />
                </div>
            </div>
            <p className="font-medium text-lg">{result}</p>

            {isFlipped ? (
                <a className="relative inline-block px-4 py-2 font-medium group">
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                    <span
                        onClick={handleRetry}
                        className="relative text-black group-hover:text-white"
                    >
                        play again
                    </span>
                </a>
            ) : (
                <>
                    <p>
                        this game winrate:{" "}
                        {new Intl.NumberFormat("en-US", {
                            style: "percent",
                        }).format(1 / chance)}
                    </p>
                    <a className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                        <span
                            onClick={() => handleGuess()}
                            className="relative transition-colors duration-300 delay-200 group-hover:text-white ease"
                        >
                            check result
                        </span>
                    </a>
                </>
            )}
        </main>
    )
}

export default Game
