export const secondsToString = (seconds) =>
{
    if (isNaN(seconds)) {
        return 0 + "h " + 0 + "m ";
    } else {
        seconds=Math.max(seconds,0)
        var numdays = Math.floor(seconds / 86400);
    
        var numhours = Math.floor((seconds % 86400) / 3600);
    
        var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    
        var numseconds = ((seconds % 86400) % 3600) % 60;
        var endstr=""
    }

    return numhours + "h " + numminutes + "m "//+numseconds+"s";
}

export const parseIntDecimal = (int, num) => {
    return parseFloat(parseFloat(int).toFixed(num));
}
