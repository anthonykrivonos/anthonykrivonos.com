export const shuffled = (array:any[]) => {
    // Shuffles array contents
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const x = array[i]
        array[i] = array[j]
        array[j] = x
    }
    return array
}

export const addClasses = (to:string, ...classes:string[]) => {
    const allClasses = to.split(' ').map(c => c.trim()).concat(classes)
    return allClasses.join(' ')
}

export const removeClasses = (from:string, ...classes:string[]) => {
    const allClasses = from.split(' ').map(c => c.trim())
    for (let i = allClasses.length - 1; i >= 0; i--) {
        if (classes.includes(allClasses[i])) {
            allClasses.splice(i, 1)
        }
    }
    return allClasses.join(' ')
}