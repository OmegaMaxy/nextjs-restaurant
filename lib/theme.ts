import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
// https://chakra-ui.com/docs/styled-system/customize-theme#customizing-global-styles
const styles = {
    global: (props: any) => ({
        body: {
            bg: mode('#efefef', '#202023')(props) //#f0e7db
        }
    })
}

const components = {
    Heading: {
        variants: {
            'section-title': {
                textDecoration: 'underline',
                fontSize: 20,
                textUnderlineOffset: 6,
                textDecorationColor: '#525252',
                textDecorationThickness: 4,
                marginTop: 3,
                marginBottom: 4
            }
        }
    },
    Link: {
        baseStyle: (props: any) => ({
            //color: mode('#3d7aed', '#ff63c3')(props),
            color: mode('#3d7aed', '#3d7aed')(props),
            textUnderlineOffset: 3
        })
    },
    Button: {
        baseStyle: (props: any) => ({
            borderRadius: '2px'
        }),
        variants: {
            'cannyButton': {
                color: '#fcfdff',
                bg: '#3376ff',
                _hover: { bg: '#588efb' }
            },
            'cannyButton-outline': (props: any) => ({
                color: mode('#333', '#fcfdff')(props),
                border: '1px solid #3376ff',
                bg: 'transparent',
                _hover: { bg: '#3376ff' } // #588efb
            })
        }
    }
}

const fonts = {
    //heading: "'M PLUS Rounded 1c'"
    heading: "'Roboto'"
}

const colors = {
    grassTeal: '#88ccca',
}

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
