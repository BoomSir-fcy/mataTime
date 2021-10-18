import React from "react"
import { Image, ImageProps } from "../../../components/Image"
import styled from "styled-components"

import image1 from './assets/1.png'
import image2 from './assets/2.png'
import image3 from './assets/3.png'
import image4 from './assets/4.png'
import image5 from './assets/5.png'
import image6 from './assets/6.png'
import image7 from './assets/7.png'
import image8 from './assets/8.png'
import image9 from './assets/9.png'
import image10 from './assets/10.png'
import image11 from './assets/11.png'
import image12 from './assets/12.png'
import image13 from './assets/13.png'
import imageDocs from './assets/docs.png'
import imageGithub from './assets/github.png'
import imageInfo from './assets/info.png'
import imageMore from './assets/more.png'
import imageReport from './assets/report.png'
import imagePools from './assets/pools.png'
import imagem from './assets/m.png'
import imaget from './assets/t.png'
import imagetg from './assets/tg.png'

const ImageStyled = styled(Image)`
  min-width: 32px;
  min-height: 32px;
`

export const HomeIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image1} {...props} />

export const TradeIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image2} {...props} />

export const LiquidityIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image3} {...props} />

export const FarmIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image4} {...props} />

export const MarketIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image5} {...props} />

export const MiningIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image6} {...props} />

export const IfoIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image7} {...props} />

export const MemberIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image8} {...props} />

export const AssetsIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image9} {...props} />

export const MallIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image10} {...props} />

export const CoinIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image11} {...props} />

export const CardIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image12} {...props} />

export const NestIcon: React.FC<ImageProps> = (props) => <ImageStyled src={image13} {...props} />

export const DocsIcon: React.FC<ImageProps> = (props) => <ImageStyled src={imageDocs} {...props} />

export const GithubIcon: React.FC<ImageProps> = (props) => <ImageStyled src={imageGithub} {...props} />

export const InfoIcon: React.FC<ImageProps> = (props) => <ImageStyled src={imageInfo} {...props} />

export const MoreIcon: React.FC<ImageProps> = (props) => <ImageStyled src={imageMore} {...props} />

export const ReportIcon: React.FC<ImageProps> = (props) => <ImageStyled src={imageReport} {...props} />

export const PoolsIcon: React.FC<ImageProps> = (props) => <ImageStyled src={imagePools} {...props} />

export const MediumIcon: React.FC<ImageProps> = (props) => <ImageStyled src={imagem} {...props} />

export const TwitterIcon: React.FC<ImageProps> = (props) => <ImageStyled src={imaget} {...props} />

export const TelegramIcon: React.FC<ImageProps> = (props) => <ImageStyled src={imagetg} {...props} />
