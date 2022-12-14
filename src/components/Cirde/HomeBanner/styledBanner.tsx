import styled, { keyframes } from 'styled-components';
import { BannerProps } from './types';

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    40% {
        opacity: 0.6;
    }
    100% {
        opacity: 1;
    }
`
// 呼吸圈
const btnRing = keyframes`
    0% {
        box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0), 0 0 30px white;
    }
    100% {
        box-shadow: inset 0 0 0 20px rgba(255, 255, 255, 1), 0 0 30px white;
    }
`

const btnExpansion = keyframes`
    0% {
        box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0), 0 0 30px white;
        transform: scale(0.5);
    }
    100% {
        box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0), 0 0 30px white;
        transform: scale(10);
    }
`

const btnSpin = keyframes`
    100% {
        transform: rotate(360deg) scale(1.8);
    }
`

const btnFade = keyframes`
    0% {
        opacity: 1;
    }
    40% {
        opacity: 0.2;
    }
    80% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`

const breathe = keyframes`
    0% {
        opacity: 0.2;
    }
    100% {
        opacity: 1;
    }
`

export const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(359deg)
    }
`

export const HomeBannerBox = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`
export const SceneButton = styled.div<BannerProps>`
    position: relative;
    height: 100%;
    display: ${({ noce }) => noce >= 2 ? 'none' : 'block'};
`
export const BeginBtn = styled.div`
    border-radius: 50%;
    transform: scale(0.5);
    left: 50%;
    top: 50%;
    margin: -12.5rem;
    width: 25rem;
    height: 25rem;
    position: absolute;
    cursor: pointer;
    :hover {
        transition: transform 0.5s cubic-bezier(1, 0, 0.5, -1) 0.25s, box-shadow 0.5s cubic-bezier(1, -5, 0.5, 5) 0.25s;
        transform: scale(0.5);
        animation: ${btnRing} 2s ease-in-out 0s infinite alternate;
        box-shadow: inset 0 0 0 20px rgba(255, 255, 255, 1), 0 0 30px white;
    }
    &::before,
    &::after {
        opacity: 0;
        content: "";
        position: absolute;
        width: 31rem;
        height: 29rem;
        margin: -2rem -3rem -2rem -3rem;
        border-radius: 50%;
        z-index: -10;
    }

    &::before {
        box-shadow: 0 -15px 30px -15px rgba(255, 255, 255, 0.8), -25px 15px 50px -25px rgba(255, 255, 255, 0.2), 0 -25px 15px -20px rgba(255, 255, 255, .3);
    }

    &::after {
        box-shadow: 0 -25px 20px -15px rgba(255, 255, 255, 0.2), 10px 25px 15px -30px rgba(255, 255, 255, 1), -10px 30px 20px -30px rgba(255, 255, 255, .3);
    }
    &:hover::before {
        animation: ${btnSpin} 3s cubic-bezier(0.6, 0.2, 0, 0.8) infinite alternate, ${btnFade} 3s cubic-bezier(0.4, 0.2, 0.1, 0.7) infinite alternate;
    }

    &:hover::after {
        animation: ${btnSpin} 3s cubic-bezier(0.4, 0.2, 0.1, 0.7) 1s infinite alternate, ${btnFade} 3s cubic-bezier(0.4, 0.2, 0.1, 0.7) infinite alternate;
    }
    
`

export const BeginBtnInfo = styled.div`
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    opacity: 0;
    position: inherit;
    width: inherit;
    height: inherit;
    :hover {
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
    }
    transform: scale(1);
    transition-delay: 1.75s;
    opacity: 1;
`
export const BeginBtnButton = styled.a<BannerProps>`
    &,
    &::after,
    &:active::after {
        border-radius: 50%;
        background: url('/images/logo.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 80%;
        margin: 0 auto;
        top: 10%;
    }
    transition: all 0.1s ease-in-out;
    font-style: normal;
    font-size: 2rem;
    color: white;
    border: 0px solid white;
    width: 5rem;
    padding: 10rem;
    margin: 0 auto;
    display: block;
    position: relative;
    ${({ noce }) => (noce > 0 ?
        `
            transition: all 0.2s ease-in-out;
            transition-delay: 0s !important;
            transform: translateY(1rem) rotateX(90deg);
            opacity: 0 !important;
        `
        :
        ''
    )}

    &:active::before {
        opacity: 0;
    }

    &:active::after {
        transition: all 0.1s ease-in-out;
        position: absolute;
        top: 0%;
        left: 20%;
    }
`
export const GointoBtn = styled.div<BannerProps>`
    &.btn_into {
        border-radius: 50%;
        transform: scale(0.5);
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 250px;
        height: 250px;
        position: absolute;
        cursor: pointer;
        animation: ${btnExpansion} 6s ease-out 0s 1 alternate;
        box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0), 0 0 30px white;
    }
    display: ${({ noce }) => noce <= 2 ? 'block' : 'none'};
    
`

export const E4center = styled.div`
    transform: scale(1);
    position: absolute;
    cursor: pointer;
    opacity: 0;
    animation: ${fadeIn} 1.5s ease-in-out 0s 1 normal;
    animation-fill-mode: forwards;
    .map1 {
        background: url("/images/map/Anormal.png");
    }

    .map1:hover {
        background: url("/images/map/Ahover.png");
    }
    &.map1-postion {
        left: 36%;
        top: 26%;
        z-index: 2;
    }
    .map2 {
        background: url("/images/map/Bnormal.png");
    }
    .map2:hover {
        background: url("/images/map/Bhover.png");
    }
    &.map2-postion {
        left: 68%;
        top: 27%;
        z-index: 3;
    }
    .map3 {
        background: url("/images/map/Cnormal.png");
    }

    .map3:hover {
        background: url("/images/map/Chover.png");
    }
    &.map3-postion {
        left: 21%;
        top: 59%;
        z-index: 2;
    }
    &.map4-postion {
        left: 44%;
        top: 62%;
        z-index: 3;
    }
    .map4 {
        background: url("/images/map/Dnormal.png");
    }

    .map4:hover {
        background: url("/images/map/Dhover.png");
    }
    &.map5-postion {
        left: 62%;
        top: 46%;
        z-index: 3;
    }

    .map5 {
        background: url("/images/map/Enormal.png");
    }

    .map5:hover {
        background: url("/images/map/Ehover.png");
    }

    &.map6-postion {
        left: 11%;
        top: 35%;
    }
    .map6 {
        background: url("/images/map/Fnormal.png");
    }
    .map6:hover {
        background: url("/images/map/Fhover.png");
    }
    &.map7-postion {
        left: 68%;
        top: 14%;
    }
    .map7 {
        background: url("/images/map/Gnormal.png");
    }
    .map7:hover {
        background: url("/images/map/Ghover.png");
    }
    .banner-e4 {
        /* z-index: 5; */
        border: 0;
        width: 16vw;
        height: 16vw;
        max-width: 10rem;
        max-height: 10rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        margin: 0 auto;
        cursor: pointer;
        transition: all 0.5s linear;
    }
    .banner-e4:hover {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        margin: 0 auto;
        transition: all 1s linear;
    }
    .banner-e4:hover::after {
        opacity: .8;
        transition: all .3s;
        transform: translate(5px, -50%);
        visibility: visible;
        display: block;
    }
`
export const TipBtn = styled.button<{ tip: string }>`
    &.tip::after {
        content: '${({ tip }) => tip}';
        visibility: hidden;
        /* 实现垂直居中 */
        position: absolute;
        top: 20%;
        transform: translate(-5px, -50%);
        transition: all .3s;
        left: -50%;
        opacity: 0;
        /* 空白问题 */
        white-space: pre;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        background-color: rgba(0, 0, 0, 0.9);
        color: #fff;
        box-shadow: 1px 1px 14px rgba(160, 160, 160, 0.407)
    }

    &.tip:hover {
        /* ie兼容 */
        overflow: visible
    }

`