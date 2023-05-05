const questions = [
    {
        question: "Quem é vinculado a fórmula E-MC² ?",
        optionA: "Sir Isaac Newton",
        optionB: "Nicolaus Copernicus",
        optionC: "Albert Einstein",
        optionD: "Ralph Waldo Emmerson",
        correctOption: "optionC"
    },

    {
        question: "Quem é o criador do Windows ?",
        optionA: "Steve Jobs",
        optionB: "Bill Gates",
        optionC: "Steve Wozniak",
        optionD: "Mark Zuckerberg",
        correctOption: "optionB"
    },

    {
        question: "Quando foi declarada a Segunda Guerra Mundial ?",
        optionA: "1 de setembro de 1939",
        optionB: "7 de dezembro de 1941",
        optionC: "28 de julho de 1914",
        optionD: "1 de novembro de 1918",
        correctOption: "optionA"
    },

    {
        question: "Que mês tem 30 dias ?",
        optionA: "Janeiro",
        optionB: "Dezembro",
        optionC: "Junho",
        optionD: "Agosto",
        correctOption: "optionC"
    },

    {
        question: "Quantas horas tem um dia ?",
        optionA: "30 horas",
        optionB: "38 horas",
        optionC: "48 horas",
        optionD: "24 horas",
        correctOption: "optionD"
    },

    {
        question: "Qual é o continente mais quente da Terra ?",
        optionA: "Oceania",
        optionB: "Antartica",
        optionC: "Africa",
        optionD: "América do Norte",
        correctOption: "optionC"
    },

    {
        question: "Qual destes números é impar ?",
        optionA: "Dez",
        optionB: "Doze",
        optionC: "Oito",
        optionD: "Onze",
        correctOption: "optionD"
    },

    {
        question: "Quem ganhou a Copa do Mundo em 2018 ?",
        optionA: "Argentina",
        optionB: "França",
        optionC: "Alemanha",
        optionD: "Brasil",
        correctOption: "optionB"
    },

    {
        question: "Qual é a capital da Alemanha ?",
        optionA: "Copenhague",
        optionB: "Berlim",
        optionC: "Varsóvia",
        optionD: "Dublin",
        correctOption: "optionB"
    },

    {
        question: "Quantos lados tem um hexagono ?",
        optionA: "Seis",
        optionB: "Sete",
        optionC: "Quatro",
        optionD: "Cinco",
        correctOption: "optionA"
    },


]


let shuffledQuestions = [] 

function handleQuestions() { 
     while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            
            correctOption = option.labels[0].id
        }
    })

    
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
        
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ 
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null

    
    if (playerScore <= 3) {
        remark = "Eita, não foi dessa vez. :/"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Bom trabalho, mas pode melhorar."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Uhuuuul! Parabéns! Continue assim."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}