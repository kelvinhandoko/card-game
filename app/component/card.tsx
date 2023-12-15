"use client"

import React, { useState } from "react"
import "./card.css"
interface FlippingCardProps {
    frontContent: React.ReactNode
    backContent: React.ReactNode
    isFlipped: boolean
}

const FlippingCard: React.FC<FlippingCardProps> = ({ frontContent, backContent, isFlipped }) => {
    return (
        <div className={`card ${isFlipped ? "flipped" : ""} hover:scale-110 `}>
            <div className="card-inner">
                <div className="card-front">{frontContent}</div>
                <div className="card-back">{backContent}</div>
            </div>
        </div>
    )
}

export default FlippingCard
