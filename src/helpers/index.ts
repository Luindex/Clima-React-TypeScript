export const FormatTemp = (temperatire : number) : number => {
    const kelvin = 273.15
    return parseInt((temperatire - kelvin).toString())
}