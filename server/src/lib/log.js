import chalk from "chalk";
import pjson from "pjson";

const simpleLog = function(info){
    return {

    };
};

const completeLog = function(info){
    return {
    
    };
};

const ColorSet = {
    'DEBUG': chalk.white,
    'INFO': chalk.yellowBright,
    'ERROR': chalk.redBright
};

export const register = function(log){
    const color = ColorSet[log.level];
    console.log(color(log));
};

export const log = function(type, info, isComplete){
    if(isComplete) return register(completeLog(info));
    return register(simpleLog(info));
};
