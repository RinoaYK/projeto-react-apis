import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { goToError } from '../routes/coordinator'
import { AnimateContext } from '../contexts/AnimateCoxtext'
import { TypeReturnContext } from '../contexts/TypeReturnContext'
import { ColorContext } from '../contexts/ColorContext'
import { FaviconContext } from '../contexts/FaviconContext'
import ButtonAddOrRemove from '../components/button/ButtonAddOrRemove'
import PreviousNextButton from '../components/button/PreviousNextButton'
import {
  Text,
  Flex,
  Box,
  Image,
  Table,
  Tr,
  Tbody,
  Td,
  Progress,
  Center,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorMode,
  chakra,
  shouldForwardProp
} from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import wingBG from '../assets/pngwing3.png'
import wing2 from '../assets/pngwing2.png'
import PokedexButton from '../components/button/PokedexButton'
import useNameSize from '../hooks/useNameSize'
import typeNull from '../assets/typeNull.gif'
import tapuBulu from '../assets/tapuBulu.gif'
import tapuFini from '../assets/tapuFini.gif'
import tapuKoko from '../assets/tapuKoko.gif'
import tapuLele from '../assets/tapuLele.gif'

const Detalhes = () => {
  const { name } = useParams()
  const { colorMode } = useColorMode()
  const { getTypes } = useContext(TypeReturnContext)
  const { getColors, getColorsType } = useContext(ColorContext)
  const { updateFavicon } = useContext(FaviconContext)
  const navigate = useNavigate()
  const [pokeId, setPokeId] = useState('')
  const [reloadPage, setReloadPage] = useState(true)

  const [nomeLateral, setNomeLateral] = useState('')
  const [ability, setAbility] = useState('')
  const [move, setMove] = useState('')
  const [statusName, setStatusName] = useState('')
  const [typeName, setTypeName] = useState('')
  const [cardColor, setCardColor] = useState('')
  const [src2, setSrc2] = useState('')
  const [gifFront, setGifFront] = useState('')
  const [gifBack, setGifBack] = useState('')

  useEffect(() => {
    searchPoke()
  }, [name, reloadPage])

  useEffect(() => {
    if (reloadPage) {
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchPoke = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
      )
      setPokeId(response.data)
      updateFavicon(
        response.data.sprites.versions['generation-vii'].icons.front_default
      )
      setNomeLateral(response.data.name)

      const abilities = response.data.abilities
      const abilityNames = abilities.map(ability => ability.ability.name)
      setAbility(abilityNames)

      const moves = response.data.moves
      const moveNames = moves.map(move => move.move.name)
      setMove(moveNames)

      const stats = response.data.stats
      const statNamesAndValues = stats.map(stat => {
        return {
          name: stat.stat.name,
          value: stat.base_stat
        }
      })
      setStatusName(statNamesAndValues)

      const types = response.data.types
      const typeNames = types.map(type => type.type)
      setTypeName(typeNames)
      const typeN = typeNames.map(type => type.name)
      setCardColor(typeN[0])

      const capitalize = string => {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
      const nameC = capitalize(response.data.name)

      switch (true) {
        case !!response.data.sprites.other.dream_world.front_default:
          setSrc2(response.data.sprites.other.dream_world.front_default)
          break
        case response.data.id === 773:
          setSrc2(
            `https://static.pokemonpets.com/images/monsters-images-300-300/2${response.data.id}-Shiny-${nameC}.webp`
          )
          break
        case response.data.id === 774:
          setSrc2(
            `https://static.pokemonpets.com/images/monsters-images-300-300/2${response.data.id}-Shiny-Minior.webp`
          )
          break
        case response.data.name.includes('-') &&
          response.data.id !== 772 &&
          response.data.id < 781:
          const nameWithoutForm = response.data.name.substring(
            0,
            response.data.name.indexOf('-')
          )
          setSrc2(
            `https://pokestop.io/img/pokemon/${nameWithoutForm}-256x256.png`
          )
          break
        default:
          setSrc2(
            `https://pokestop.io/img/pokemon/${response.data.name}-256x256.png`
          )
          break
      }

      switch (true) {
        case response.data.name === 'type-null':
          setGifFront(typeNull)
          break
        case response.data.name === 'tapu-koko':
          setGifFront(tapuKoko)
          break
        case response.data.name === 'tapu-lele':
          setGifFront(tapuLele)
          break
        case response.data.name === 'tapu-bulu':
          setGifFront(tapuBulu)
          break
        case response.data.name === 'tapu-fini':
          setGifFront(tapuFini)
          break
        case !!response.data.sprites.versions['generation-v']['black-white']
          .animated.front_default:
          setGifFront(
            response.data.sprites.versions['generation-v']['black-white']
              .animated.front_default
          )
          break
        case response.data.id < 740 && response.data.name.includes('-'):
          const nameWithoutForm = response.data.name.substring(
            0,
            response.data.name.indexOf('-')
          )
          setGifFront(
            `https://www.pkparaiso.com/imagenes/xy/sprites/animados/${nameWithoutForm}.gif`
          )
          break
        case response.data.id > 740 &&
          response.data.id < 781 &&
          response.data.name.includes('-'):
          const nameWithoutForm2 = response.data.name.substring(
            0,
            response.data.name.indexOf('-')
          )
          setGifFront(
            `https://www.pkparaiso.com/imagenes/sol-luna/sprites/animados/${nameWithoutForm2}.gif`
          )
          break
        case response.data.id > 721:
          setGifFront(
            `https://www.pkparaiso.com/imagenes/sol-luna/sprites/animados/${response.data.name}.gif`
          )
          break
        default:
          setGifFront(
            `https://www.pkparaiso.com/imagenes/xy/sprites/animados/${response.data.name}.gif`
          )
          break
      }

      switch (true) {
        case response.data.name === 'type-null' ||
          response.data.name === 'tapu-koko' ||
          response.data.name === 'tapu-lele' ||
          response.data.name === 'tapu-bulu' ||
          response.data.name === 'tapu-fini':
          setGifBack(
            response.data.sprites.versions['generation-v']['black-white']
              .back_default
          )
          break
        case !!response.data.sprites.versions['generation-v']['black-white']
          .animated.back_default:
          setGifBack(
            response.data.sprites.versions['generation-v']['black-white']
              .animated.back_default
          )
          break
        case response.data.id < 740 && response.data.name.includes('-'):
          const nameWithoutForm = response.data.name.substring(
            0,
            response.data.name.indexOf('-')
          )
          setGifBack(
            `https://www.pkparaiso.com/imagenes/xy/sprites/animados-espalda/${nameWithoutForm}.gif`
          )
          break
        case response.data.id > 740 &&
          response.data.id < 781 &&
          response.data.name.includes('-'):
          const nameWithoutForm2 = response.data.name.substring(
            0,
            response.data.name.indexOf('-')
          )
          setGifBack(
            `https://www.pkparaiso.com/imagenes/sol-luna/sprites/animados-espalda/${nameWithoutForm2}.gif`
          )
          break
        case response.data.id > 721:
          setGifBack(
            `https://www.pkparaiso.com/imagenes/sol-luna/sprites/animados-espalda/${response.data.name}.gif`
          )
          break
        default:
          setGifBack(
            `https://www.pkparaiso.com/imagenes/xy/sprites/animados-espalda/${response.data.name}.gif`
          )
          console.log('caiu default')
      }
    } catch (error) {
      goToError(navigate)
    }
  }

  const {
    textDisplay,
    textDisplayOut,
    textAnimationComplete,
    setTextAnimationComplete,
    textDisplayOutP,
    shouldAnimate,
    isAnimeted,
    setIsAnimeted
  } = useContext(AnimateContext)

  const AnimateBox = chakra(motion.div, {
    shouldForwardProp: prop =>
      isValidMotionProp(prop) || shouldForwardProp(prop)
  })

  const textAnimationInitial = useBreakpointValue({
    base: {
      opacity: textAnimationComplete ? 1 : 0
    },
    smm: {
      opacity: textAnimationComplete ? 1 : 0,
      scaleX: textAnimationComplete ? '100%' : '0',
      transformOrigin: 'left'
    }
  })

  const textAnimation = useBreakpointValue({
    base: {
      opacity: 1
    },
    smm: {
      opacity: 1,
      scaleX: '100%'
    }
  })

  const textTransition = useBreakpointValue({
    base: {
      duration: 1,
      ease: 'easeInOut'
    },
    smm: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  })

  const textAnimationInitial2 = useBreakpointValue({
    base: {
      opacity: 1,
      scaleX: '100%',
      transformOrigin: 'left'
    },
    lg: {
      opacity: 1,
      scaleY: '100%',
      scaleX: '100%',
      transformOrigin: shouldAnimate ? 'left' : 'bottom'
    }
  })

  const textAnimation2 = useBreakpointValue({
    base: {
      opacity: 0,
      scaleX: 0
    },
    lg: {
      opacity: 0,
      scaleY: shouldAnimate ? '100%' : 0,
      scaleX: shouldAnimate ? 0 : '100%'
    }
  })

  const wing2Initial = useBreakpointValue({
    base: {
      top: isAnimeted ? '380px' : '290px',
      left: isAnimeted ? '20px' : '180px',
      transform: isAnimeted ? 'scale(0.95)' : 'scale(1)',
      opacity: isAnimeted ? 1 : 0
    },
    sm: {
      top: isAnimeted ? '435px' : '225px',
      left: isAnimeted ? '5px' : '210px',
      transform: isAnimeted ? 'scale(0.9)' : 'scale(0.85)',
      opacity: isAnimeted ? 1 : 0
    },
    smm: {
      top: isAnimeted ? '335px' : '120px',
      left: isAnimeted ? '-45px' : '230px',
      transform: isAnimeted ? 'scale(0.81)' : 'scale(0.58)',
      opacity: isAnimeted ? 1 : 0
    },

    md: {
      top: isAnimeted ? '345px' : '35px',
      left: isAnimeted ? '30px' : '230px',
      transform: isAnimeted ? 'scale(1)' : 'scale(0.4)',
      opacity: isAnimeted ? 1 : 0
    },

    lg: {
      top: isAnimeted ? '440px' : '-25px',
      left: isAnimeted ? '110px' : '350px',
      transform: isAnimeted ? 'scale(1.2)' : 'scale(0.38)',
      opacity: isAnimeted ? 1 : 0
    },

    xl: {
      top: isAnimeted ? '195px' : '-70px',
      left: isAnimeted ? '698px' : '490px',
      transform: isAnimeted ? 'scale(1)' : 'scale(0.40)',
      opacity: isAnimeted ? 1 : 0
    },
    '2xl': {
      top: isAnimeted ? '195px' : '-55px',
      left: isAnimeted ? '1075px' : '700px',
      transform: isAnimeted ? 'scale(1)' : 'scale(0.47)',
      opacity: isAnimeted ? 1 : 0
    },
    '3xl': {
      top: isAnimeted ? '195px' : '-70px',
      left: isAnimeted ? '1423px' : '870px',
      transform: isAnimeted ? 'scale(1)' : 'scale(0.49)',
      opacity: isAnimeted ? 1 : 0
    },
    '4xl': {
      top: isAnimeted ? '195px' : '-60px',
      left: isAnimeted ? '1600px' : '1047px',
      transform: isAnimeted ? 'scale(1)' : 'scale(0.53)',
      opacity: isAnimeted ? 1 : 0
    },
    '5xl': {
      top: isAnimeted ? '195px' : '-61px',
      left: isAnimeted ? '1853px' : '1370px',
      transform: isAnimeted ? 'scale(1)' : 'scale(0.53)',
      opacity: isAnimeted ? 1 : 0
    }
  })

  const wing2Animate = useBreakpointValue({
    base: {
      top: '380px',
      left: '20px',
      transform: 'scale(0.95)',
      opacity: 1
    },
    sm: {
      top: '435px',
      left: '5px',
      transform: 'scale(0.9)',
      opacity: 1
    },
    smm: {
      top: '335px',
      left: '-45px',
      transform: 'scale(0.81)',
      opacity: 1
    },
    md: {
      top: '345px',
      left: '30px',
      transform: 'scale(1)',
      opacity: 1
    },

    lg: {
      top: '440px',
      left: '110px',
      transform: 'scale(1.2)',
      opacity: 1
    },

    xl: {
      top: '195px',
      left: '698px',
      transform: 'scale(1)',
      opacity: 1
    },

    '2xl': {
      top: '195px',
      left: '1075px',
      transform: 'scale(1)',
      opacity: 1
    },
    '3xl': {
      top: '195px',
      left: '1423px',
      transform: 'scale(1)',
      opacity: 1
    },
    '4xl': {
      top: '195px',
      left: '1600px',
      transform: 'scale(1)',
      opacity: 1
    },
    '5xl': {
      top: '195px',
      left: '1853px',
      transform: 'scale(1)',
      opacity: 1
    }
  })

  const cardBGInitial = useBreakpointValue({
    base: {
      top: isAnimeted ? '395px' : '-365px',
      transform: isAnimeted
        ? 'scaleY(1) scaleX(0.85)'
        : 'scaleY(0.115) scaleX(1)'
    },
    sm: {
      top: isAnimeted ? '465px' : '-260px',
      transform: isAnimeted
        ? 'scale(1) scaleY(1)'
        : 'scaleY(0.157) scaleX(0.75)'
    },

    smm: {
      top: isAnimeted ? '423px' : '-260px',
      transform: isAnimeted
        ? 'scale(1) scaleY(1)'
        : 'scaleY(0.157) scaleX(0.75)'
    },
    md: {
      top: isAnimeted ? '350px' : '70px',
      transform: isAnimeted ? 'scale(1) scaleY(1)' : 'scaleX(0.45) scaleY(0.48)'
    },

    lg: {
      top: isAnimeted ? '350px' : '-250px',
      transform: isAnimeted
        ? 'scaleX(1) scaleY(1)'
        : 'scaleX(0.53) scaleY(0.22)'
    },
    xl: {
      top: isAnimeted ? '350px' : '140px',
      transform: isAnimeted ? 'scaleX(1) scaleY(1)' : 'scaleX(0.3) scaleY(0.56)'
    },
    '2xl': {
      top: isAnimeted ? '350px' : '140px',
      transform: isAnimeted ? 'scaleX(1) scaleY(1)' : 'scaleX(0.3) scaleY(0.56)'
    },
    '4xl': {
      top: isAnimeted ? '350px' : '160px',
      transform: isAnimeted
        ? 'scaleX(1) scaleY(1)'
        : 'scaleX(0.33) scaleY(0.63)'
    },
    '5xl': {
      top: isAnimeted ? '350px' : '200px',
      transform: isAnimeted
        ? 'scaleX(1) scaleY(1)'
        : 'scaleX(0.33) scaleY(0.63)'
    }
  })

  const cardBGAnimate = useBreakpointValue({
    base: {
      top: '395px',
      transform: 'scaleY(1) scaleX(0.85)'
    },
    sm: {
      top: '465px',
      transform: 'scaleY(1) scaleX(1)'
    },
    smm: {
      top: '423px',
      transform: 'scaleY(1) scaleX(1)'
    },
    md: {
      top: '350px',
      transform: 'scaleX(1) scaleY(1)'
    }
  })

  const statusGifsInitial = useBreakpointValue({
    base: {
      transform: isAnimeted ? 'scaleX(1) scaleY(1)' : 'scaleY(0) scaleX(0)',
      transformOrigin: 'center top'
    },
    xl: {
      transform: isAnimeted ? 'scaleX(1) scaleY(1)' : 'scaleY(0) scaleX(0)',
      transformOrigin: 'right top'
    }
  })

  const imagemCardInitial = useBreakpointValue({
    base: {
      transform: isAnimeted ? 'scale(1)' : 'scale(0.8)',
      top: isAnimeted ? '-115px' : '-240px',
      right: isAnimeted ? '-20px' : '25px'
    },
    xl: {
      transform: isAnimeted ? 'scale(1)' : 'scale(0.95)',
      top: isAnimeted ? '-115px' : '-185px',
      right: isAnimeted ? '-20px' : '342px'
    },
    '3xl': {
      transform: isAnimeted ? 'scale(1)' : 'scale(1)',
      top: isAnimeted ? '-115px' : '-150px',
      right: isAnimeted ? '-20px' : '-120px'
    }
  })

  const idInitial = useBreakpointValue({
    base: {
      top: isAnimeted ? '30px' : '-45px',
      left: isAnimeted ? '0px' : '90px',
      transform: isAnimeted ? 'scale(1.1)' : 'scale(1.5)'
    },
    xl: {
      top: isAnimeted ? '30px' : '-92px',
      left: isAnimeted ? '0px' : '-285px',
      transform: isAnimeted ? 'scale(1.1)' : 'scale(1.3)'
    },
    '2xl': {
      top: isAnimeted ? '30px' : '-45px',
      left: isAnimeted ? '0px' : '90px',
      transform: isAnimeted ? 'scale(1.1)' : 'scale(1.5)'
    }
  })

  const nameInitial = useBreakpointValue({
    base: {
      top: isAnimeted ? '70px' : '5px',
      left: isAnimeted ? '0px' : '90px',
      transform: isAnimeted ? 'scale(1)' : 'scale(1)'
    },
    xl: {
      top: isAnimeted ? '70px' : '-55px',
      left: isAnimeted ? '0px' : '-310px',
      transform: isAnimeted ? 'scale(1)' : 'scale(0.86)'
    },
    '2xl': {
      top: isAnimeted ? '70px' : '5px',
      left: isAnimeted ? '0px' : '90px',
      transform: isAnimeted ? 'scale(1)' : 'scale(1)'
    }
  })

  const typeInitial = useBreakpointValue({
    base: {
      top: isAnimeted ? '95px' : '37px',
      left: isAnimeted ? '0px' : '95px',
      transform: isAnimeted ? 'scale(1)' : 'scale(1.4)'
    },
    xl: {
      top: isAnimeted ? '95px' : '-30px',
      left: isAnimeted ? '0px' : '-277px',
      transform: isAnimeted ? 'scale(1)' : 'scale(1.18)'
    },
    '2xl': {
      top: isAnimeted ? '95px' : '37px',
      left: isAnimeted ? '0px' : '95px',
      transform: isAnimeted ? 'scale(1)' : 'scale(1.4)'
    }
  })

  const nameSize = useNameSize(
    nomeLateral.length,
    nomeLateral.charAt(0),
    '48px',
    '36px',
    '34px',
    '34px',
    '34px',
    '34px'
  )

  const nomeLateralL = useNameSize(
    nomeLateral.length,
    nomeLateral.charAt(0),
    '95px',
    '70px',
    '58px',
    '54px',
    '55px',
    '64px'
  )

  const movesName = move.slice(0, useBreakpointValue({ base: 10, md: 20 }))

  let total = 0
  for (let i = 0; i < statusName.length; i++) {
    const stat = statusName[i]
    total += stat.value
  }

  return (
    <Box
      minH={{
        base: '230vh',
        md: '167vh',
        xl: '104vh'
      }}
      bg={colorMode === 'light' ? 'light.background' : 'dark.background'}
      bgImage={wingBG}
      bgRepeat='no-repeat'
      backgroundSize={{ base: '40em', sm: '55em', lg: '75em', '2xl': '96em' }}
      bgPosition='center top'
      align='center'
    >
      <Flex
        align='center'
        justify='space-between'
        direction={{
          base: 'column',
          smm: 'row'
        }}
        position='relative'
        maxW='142em'
      >
        <Box
          display={{ base: 'block', lg: 'none' }}
          position='absolute'
          top='1'
          left='5'
        >
          <PokedexButton />
        </Box>

        <AnimateBox
          transition={textTransition}
          initial={textAnimationInitial}
          animate={textAnimation}
          display={textDisplay}
          onAnimationComplete={() => {
            setTextAnimationComplete(true)
          }}
        >
          <Text
            fontSize='48px'
            fontWeight='bold'
            fontFamily='poppins'
            color={colorMode === 'light' ? 'light.white' : 'dark.pTitle'}
            mt='79px'
            ml={{
              base: '0px',
              smm: '40px'
            }}
            mb={{
              base: '20px',
              smm: '35px'
            }}
          >
            Detalhes
          </Text>
        </AnimateBox>

        <AnimateBox
          initial={textAnimationInitial2}
          animate={textAnimation2}
          transition={{
            duration: 0.5,
            ease: 'easeInOut'
          }}
          display={textDisplayOut}
        >
          <Text
            fontSize='48px'
            fontWeight='bold'
            fontFamily='poppins'
            color={colorMode === 'light' ? 'light.white' : 'dark.pTitle'}
            mt='79px'
            ml='40px'
            mb='20px'
            display={{
              base: 'none',
              smm: 'block'
            }}
          >
            Detalhes
          </Text>
        </AnimateBox>

        <AnimateBox
          initial={{
            opacity: 1,
            scaleX: '100%',
            transformOrigin: 'left'
          }}
          animate={{ opacity: 0, scaleX: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut'
          }}
          display={textDisplayOutP}
        >
          <Text
            fontSize='48px'
            fontWeight='bold'
            fontFamily='poppins'
            color={colorMode === 'light' ? 'light.white' : 'dark.pTitle'}
            mt='79px'
            ml='40px'
            mb='20px'
            display={{
              base: 'none',
              smm: 'block'
            }}
          >
            Detalhes
          </Text>
        </AnimateBox>

        <Box
          mr={{
            base: '0px',
            smm: '40px',
            xl: '0px',
            '2xl': '40px'
          }}
          mt={{
            base: '0px',
            smm: '7em'
          }}
          mb={{
            base: '10px',
            smm: '0px'
          }}
          pb={{
            base: '60px',
            md: '0px'
          }}
        >
          <ButtonAddOrRemove />
        </Box>

        <Box
          display={{
            base: 'none',
            xl: 'block',
            '2xl': 'none'
          }}
        ></Box>
      </Flex>
      <AnimateBox
        initial={wing2Initial}
        animate={wing2Animate}
        transition={{
          duration: 0.5,
          ease: 'easeOut'
        }}
        position='fixed'
        display={isAnimeted ? 'none' : 'block'}
        zIndex='docked'
      >
        <Image src={wing2}></Image>
      </AnimateBox>

      <Flex>
        {pokeId !== '' ? (
          <Center pl='2em' pr='2em'>
            <AnimateBox
              initial={cardBGInitial}
              animate={cardBGAnimate}
              transition={{
                duration: 0.5,
                ease: 'easeOut'
              }}
              onAnimationComplete={() => setIsAnimeted(true)}
              bg={getColors(cardColor)}
              display={isAnimeted ? 'none' : 'block'}
              h={{
                base: '101.4em',
                md: '72.8em',
                xl: '35.7em'
              }}
              maxW={{
                base: '25em',
                sm: '35em',
                smm: '43em',
                md: '57em',
                lg: '75em',
                xl: '91em',
                '2xl': '115em',
                '3xl': '137em',
                '4xl': '140em',
                '5xl': '140em'
              }}
              w='100%'
              borderRadius='37.8857px'
              mb={{ base: '1.5em', sm: '2em' }}
              position='fixed'
              pl={{ base: '0', smm: '1em' }}
              pr={{ base: '0', smm: '1em' }}
            />

            <Grid
              postion='relative'
              justifyItems='center'
              align='center'
              alignItems='center'
              bg={isAnimeted ? getColors(cardColor) : 'transparent'}
              h={{
                base: '103em',
                md: '75em',
                xl: '38em'
              }}
              maxW='140em'
              w='100%'
              borderRadius='37.8857px'
              mb={{ base: '1.5em', sm: '2em' }}
              mt={{
                base: '-60px',
                sm: '10px',
                smm: '35px',
                md: '0px'
              }}
              bgSize='cover'
              bgImage={isAnimeted ? wing2 : 'none'}
              bgRepeat='no-repeat'
              backgroundSize={{
                base: '23em',
                sm: '30em',
                smm: '40em',
                md: '50em',
                lg: '60em',
                xl: '50em'
              }}
              bgPosition={{ base: 'top left', xl: 'center right' }}
              pl={{ base: '0', smm: '1em' }}
              pr={{ base: '0', smm: '1em' }}
              templateColumns={{
                md: '1fr 1.12fr ',
                xl: '1.05fr 1.15fr 2.4fr',
                '2xl': '1.05fr 1.15fr 2.4fr 1.6fr',
                '3xl': '1.05fr 1.15fr 2.4fr 3fr'
              }}
              templateRows={{
                base: '0.8fr 0.8fr 2.5fr 3fr',
                md: '1fr 1.3fr 1.3fr 1.8fr',
                xl: '1fr 1fr 3fr'
              }}
              gridTemplateAreas={{
                xl: `   'gif1 bStatus card extra'
            'gif1 bStatus move extra'
            'gif2 bStatus move extra'`,

                md: `'card card'            
            'gif1 bStatus'
            'gif2 bStatus'
            'move move'`,

                base: `'card card'            
            'gif1 gif2'
            ' bStatus bStatus'
            'move move'`
              }}
            >
              <AnimateBox
                position='absolute'
                justifySelf='right'
                h={{ '2xl': '30em', '3xl': '35em' }}
                w={{ '2xl': '30em', '3xl': '35em' }}
                pt='5em'
                pb='5em'
                pl={{ '2xl': '10em', '3xl': '0em' }}
                pr={{ '2xl': '0em', '3xl': '6em' }}
                display={{ base: 'none', '2xl': 'block' }}
                initial={{
                  opacity: isAnimeted ? 1 : 0,
                  transform: isAnimeted ? 'scale(1)' : 'scale(0)',
                  zIndex: isAnimeted ? 'auto' : 'sticky',
                  top: isAnimeted ? '' : '0',
                  left: isAnimeted ? '' : '1000px'
                }}
                animate={{
                  top: '',
                  left: '',
                  opacity: 1,
                  transform: 'scale(1)',
                  zIndex: 'auto'
                }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut'
                }}
              >
                <Image
                  width='100%'
                  height='100%'
                  maxWidth='fit-content'
                  maxHeight='fit-content'
                  objectFit='contain'
                  src={src2}
                  alt={nomeLateral}
                  display={{ base: 'none', '2xl': 'block' }}
                />
              </AnimateBox>

              <GridItem
                area='gif1'
                mt={{ base: '0', xl: '1em' }}
                justifySelf={{ base: 'right', xl: 'center' }}
                alignSelf={{ base: 'start', xl: 'center' }}
                mr={{ base: '0.5em', smm: '1em', xl: '0' }}
              >
                <AnimateBox
                  initial={statusGifsInitial}
                  animate={{
                    transform: 'scaleX(1) scaleY(1)'
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut'
                  }}
                >
                  <Flex
                    w={{ base: '10em', md: '64' }}
                    h={{ base: '10em', md: '64' }}
                    bg={
                      colorMode === 'light' ? 'light.white' : 'dark.detalhesBG'
                    }
                    borderRadius='.5em'
                    align='center'
                    justify='center'
                  >
                    <Image h={24} src={gifFront} alt={nomeLateral} />
                  </Flex>
                </AnimateBox>
              </GridItem>

              <GridItem
                area={'gif2'}
                mt={{ base: '0', xl: '-1em' }}
                justifySelf={{ base: 'left', md: 'right', xl: 'center' }}
                alignSelf={{ base: 'start', xl: 'center' }}
                mr={{ base: '0em', sm: '1em', xl: '0' }}
                ml={{ base: '0.5em', sm: '1em', md: '0' }}
              >
                <AnimateBox
                  initial={statusGifsInitial}
                  animate={{
                    transform: 'scaleX(1) scaleY(1)'
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut'
                  }}
                >
                  <Flex
                    w={{ base: '10em', md: '64' }}
                    h={{ base: '10em', md: '64' }}
                    bg={
                      colorMode === 'light' ? 'light.white' : 'dark.detalhesBG'
                    }
                    borderRadius='.5em'
                    align='center'
                    justify='center'
                  >
                    <Image w={24} src={gifBack} alt={nomeLateral} />
                  </Flex>
                </AnimateBox>
              </GridItem>

              <GridItem
                area={'bStatus'}
                justifySelf={{ base: 'center', md: 'left', xl: 'center' }}
                alignSelf={{ base: 'start', xl: 'center' }}
                ml={{ base: '0em', sm: '-1em', md: '1em' }}
              >
                <AnimateBox
                  initial={statusGifsInitial}
                  animate={{
                    transform: 'scaleX(1) scaleY(1)'
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut'
                  }}
                >
                  <Flex
                    direction='column'
                    w={80}
                    bg={
                      colorMode === 'light' ? 'light.white' : 'dark.detalhesBG'
                    }
                    borderRadius='.5em'
                    p={5}
                    h='34em'
                  >
                    <Text
                      fontFamily='inter'
                      fontWeight='800'
                      fontSize='24px'
                      mb={1}
                      textAlign={{ base: 'center', md: 'left' }}
                      color={colorMode === 'light' ? 'black' : 'dark.pTitle'}
                    >
                      Base stats:
                    </Text>
                    <Flex>
                      <Box borderTop='1px solid #cbcbcb'>
                        {statusName.map(stat => {
                          if (stat.name === 'hp') {
                            stat.name = 'HP'
                          }
                          if (stat.name === 'special-attack') {
                            stat.name = 'Sp-Atk'
                          } else if (stat.name === 'special-defense') {
                            stat.name = 'Sp-Def'
                          }
                          return (
                            <Table size='sm' key={stat.name}>
                              <Tbody>
                                <Tr>
                                  <Td textAlign='right' w='6em'>
                                    <Text
                                      textTransform='capitalize'
                                      color='grey'
                                      fontWeight='450'
                                      fontFamily='inter'
                                    >
                                      {stat.name}
                                    </Text>
                                  </Td>
                                  <Td fontWeight='700' ml={3} textAlign='right'>
                                    {stat.value}
                                  </Td>
                                  <Td w='10em'>
                                    <Progress
                                      max='200'
                                      borderRadius={4}
                                      colorScheme={
                                        stat.name === 'Sp-Atk' ||
                                        stat.name === 'Sp-Def'
                                          ? 'progressYellow'
                                          : 'progressOrange'
                                      }
                                      value={stat.value}
                                    />
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          )
                        })}
                        <Box borderBottom='1px solid #cbcbcb'>
                          <Flex gap={9}>
                            <Text
                              pl='1.7em'
                              color='grey'
                              textAlign='right'
                              fontWeight='600'
                              fontFamily='inter'
                              mb={3}
                            >
                              Total
                            </Text>
                            <Text fontWeight='800'>{total}</Text>
                          </Flex>
                        </Box>
                      </Box>
                    </Flex>
                    <Text
                      fontFamily='inter'
                      fontWeight='800'
                      fontSize='24px'
                      mb={3}
                      mt={5}
                      textAlign={{ base: 'center', md: 'left' }}
                      color={colorMode === 'light' ? 'black' : 'dark.pTitle'}
                    >
                      Abilities:
                    </Text>
                    {ability.map(abilityName => (
                      <Text
                        key={abilityName}
                        bg={
                          colorMode === 'light'
                            ? 'light.moves'
                            : 'dark.background'
                        }
                        borderRadius='12px'
                        border='1px dashed'
                        borderColor={
                          colorMode === 'light'
                            ? 'light.movesBorder'
                            : 'dark.pTitle'
                        }
                        p='10px'
                        fontFamily='serrat'
                        fontSize='14'
                        fontWeight='400'
                        textTransform='capitalize'
                        mb={4}
                        maxWidth='fit-content'
                        alignSelf={{ base: 'center', md: 'start' }}
                        color={colorMode === 'light' ? 'black' : 'dark.pTitle'}
                      >
                        {abilityName}
                      </Text>
                    ))}
                  </Flex>
                </AnimateBox>
              </GridItem>

              <GridItem area={'card'}>
                <Flex
                  direction='column'
                  w={{ base: '15em', sm: '32em', smm: '36.5em' }}
                  pt='2em'
                  transform={{ base: 'scale(0.8)', md: 'scale(1)' }}
                  ml={{
                    base: '0em',
                    sm: '-1em',
                    md: '2em',
                    lg: '2em',
                    xl: '2em'
                  }}
                  mb={{ base: '-1.5em', sm: '-1em', md: '0' }}
                >
                  <Flex h='11em' width='100%' justify='space-between'>
                    <Flex
                      direction='column'
                      color={
                        colorMode === 'light' ? 'light.white' : 'dark.button'
                      }
                      pb={12}
                      textAlign='left'
                    >
                      <AnimateBox
                        initial={idInitial}
                        animate={{
                          top: '30px',
                          left: '0px',
                          transform: 'scale(1.1)'
                        }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeInOut'
                        }}
                        position='fixed'
                      >
                        <Text
                          fontFamily='inter'
                          fontWeight='700'
                          fontSize='16px'
                          mb='1.2em'
                        >
                          #{pokeId.id < 10 ? `0${pokeId.id}` : pokeId.id}
                        </Text>
                      </AnimateBox>
                      <AnimateBox
                        initial={nameInitial}
                        animate={{
                          top: '70px',
                          left: '0px',
                          transform: 'scale(1)'
                        }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeInOut'
                        }}
                        position='fixed'
                      >
                        <Text
                          fontFamily='inter'
                          fontWeight='700'
                          fontSize={nameSize}
                          textTransform='capitalize'
                          mt='-.2em'
                          lineHeight='34px'
                        >
                          {name}
                        </Text>
                      </AnimateBox>
                      <AnimateBox
                        display='flex'
                        gap={8}
                        mt={6}
                        initial={typeInitial}
                        animate={{
                          top: '95px',
                          left: '0px',
                          transform: 'scale(1)'
                        }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeInOut'
                        }}
                        position='fixed'
                      >
                        <Flex gap='1.5em'>
                          {typeName.map(type => {
                            return (
                              <Flex
                                borderRadius='8px'
                                border='1px dashed'
                                borderColor={
                                  colorMode === 'light'
                                    ? 'light.white'
                                    : 'dark.button'
                                }
                                p='10px'
                                align='center'
                                justify='center'
                                maxWidth='fit-content'
                                w='107px'
                                gap='0.7em'
                                h='31px'
                                bg={getColorsType(type.name)}
                                transform='scale(1.1)'
                                key={type.name}
                              >
                                <Image
                                  zIndex='docked'
                                  src={getTypes(type.name[0])}
                                  alt={type.name}
                                />

                                <Text
                                  fontFamily='poppins'
                                  fontSize='14'
                                  fontWeight='400'
                                  textTransform='capitalize'
                                  color={
                                    colorMode === 'light'
                                      ? 'light.white'
                                      : 'dark.button'
                                  }
                                >
                                  {type.name}
                                </Text>
                              </Flex>
                            )
                          })}
                        </Flex>
                      </AnimateBox>
                    </Flex>

                    <AnimateBox
                      initial={imagemCardInitial}
                      animate={{
                        top: '-115px',
                        right: '-20px',
                        transform: 'scale(1)'
                      }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeOut'
                      }}
                      zIndex={isAnimeted ? 'auto' : 'banner'}
                      position='fixed'
                      direction='column'
                      maxW={72}
                      mb='2em'
                      alignSelf='flex-end'
                      display={{ base: 'none', sm: 'flex' }}
                    >
                      <Image
                        alt={nomeLateral}
                        src={
                          pokeId.sprites.other['official-artwork'].front_default
                        }
                      />
                    </AnimateBox>
                  </Flex>
                </Flex>
              </GridItem>

              <GridItem area={'move'} alignSelf='start'>
                <AnimateBox
                  initial={{
                    transform: isAnimeted ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top'
                  }}
                  animate={{
                    transform: 'scaleY(1)'
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut'
                  }}
                >
                  <Flex
                    direction='column'
                    bg={
                      colorMode === 'light' ? 'light.white' : 'dark.detalhesBG'
                    }
                    borderRadius='.5em'
                    p={5}
                    h={{ base: '41em', md: '23em' }}
                    w={{ base: '20em', md: '36.5em' }}
                    ml={{
                      base: '0em',
                      sm: '-1em',
                      md: '1em',
                      lg: '0em',
                      xl: '1em'
                    }}
                  >
                    <Text
                      fontFamily='inter'
                      fontWeight='800'
                      fontSize='24px'
                      mb={3}
                      w='100%'
                      textAlign={{ base: 'center', md: 'left' }}
                      color={colorMode === 'light' ? 'black' : 'dark.pTitle'}
                    >
                      Moves:
                    </Text>
                    <Flex direction='column' wrap='wrap' h='100%' columnGap={4}>
                      {movesName.map(abilityName => (
                        <Text
                          key={abilityName}
                          bg={
                            colorMode === 'light'
                              ? 'light.moves'
                              : 'dark.background'
                          }
                          borderRadius='12px'
                          border='1px dashed'
                          borderColor={
                            colorMode === 'light'
                              ? 'light.movesBorder'
                              : 'dark.pTitle'
                          }
                          p='10px'
                          fontFamily='serrat'
                          fontSize='14'
                          fontWeight='400'
                          textTransform='capitalize'
                          mb={4}
                          maxWidth='fit-content'
                          alignSelf={{ base: 'center', md: 'start' }}
                          color={
                            colorMode === 'light' ? 'black' : 'dark.pTitle'
                          }
                        >
                          {abilityName}
                        </Text>
                      ))}
                    </Flex>
                  </Flex>
                </AnimateBox>
              </GridItem>

              <GridItem
                area={'extra'}
                display={{ base: 'none', '3xl': 'block' }}
              >
                <AnimateBox
                  initial={{
                    transform: isAnimeted ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top'
                  }}
                  animate={{
                    transform: 'scaleY(1)'
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut'
                  }}
                >
                  <Flex
                    align='center'
                    h='50em'
                    direction='column'
                    transform='rotate(-90deg)'
                    gap='12em'
                  >
                    <Text
                      fontFamily='inter'
                      fontWeight='700'
                      fontSize={nomeLateralL}
                      textTransform='capitalize'
                      color='#ffffff10'
                    >
                      {name}
                    </Text>
                  </Flex>
                </AnimateBox>
              </GridItem>
            </Grid>
          </Center>
        ) : (
          !setReloadPage
        )}
      </Flex>

      <PreviousNextButton />
    </Box>
  )
}
export default Detalhes
