document.addEventListener('DOMContentLoaded', () => {
    const moodCards = document.querySelectorAll('.mood-card');
    const activityText = document.getElementById('activity');
    const quoteText = document.getElementById('quote');
    const recommendations = document.getElementById('recommendations');
    const tryAgainBtn = document.getElementById('try-again-btn');
    const jokeBtn = document.getElementById('joke-btn');
    const jokeDiv = document.getElementById('joke');
    const breathingBtn = document.getElementById('breathing-btn');
    const timerDiv = document.getElementById('timer');

    const body = document.body;

    // User Manual Modal Elements
    const manualBtn = document.getElementById('manual-btn');
    const modal = document.getElementById('user-manual-modal');
    const closeBtn = document.getElementById('close-btn');

    // Mood recommendations and quotes with multiple options
    const recommendationsMap = {
        happy: {
            activities: [
                "Keep smiling! How about listening to some upbeat music or trying a fun hobby?",
                "Dance like nobody's watching!",
                "Reach out to a friend and spread some positivity.",
                "Take a walk in nature and enjoy the little things."
            ],
            quotes: [
                "Happiness is not something ready-made. It comes from your own actions. – Dalai Lama",
                "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well. – Ralph Waldo Emerson",
                "Happiness depends upon ourselves. – Aristotle",
                "For every minute you are angry, you lose sixty seconds of happiness. – Ralph Waldo Emerson"
            ]
        },
        stressed: {
            activities: [
                "Take a deep breath. Maybe a short walk or try some stretching exercises?",
                "Write down what's on your mind to release some of that tension.",
                "Listen to soothing music or sounds of nature.",
                "Take a break and enjoy a cup of herbal tea or coffee."
            ],
            quotes: [
                "It does not matter how slowly you go as long as you do not stop. – Confucius",
                "Stress is caused by being 'here' but wanting to be 'there'. – Eckhart Tolle",
                "Calmness is the cradle of power. – Josiah Gilbert Holland",
                "The greatest weapon against stress is our ability to choose one thought over another. – William James"
            ]
        },
        tired: {
            activities: [
                "How about a power nap or some light reading to recharge your energy?",
                "Try a warm bath or a relaxing shower to refresh yourself.",
                "Take a moment to meditate and let your body unwind.",
                "Hydrate and stretch to wake up your body."
            ],
            quotes: [
                "Rest is not idleness, and to lie down sometimes on the grass under trees on a summer's day listening to the murmur of water is by no means a waste of time. – John Lubbock",
                "The time to relax is when you don’t have time for it. – Sydney J. Harris",
                "A good laugh and a long sleep are the best cures in the doctor’s book. – Irish Proverb",
                "Tired minds don’t plan well. Sleep first, plan later. – Walter Reisch"
            ]
        },
        anxious: {
            activities: [
                "Try some breathing exercises or meditate for a few minutes. Calm your mind.",
                "Journaling can be a great way to release anxiety. Write down your thoughts.",
                "Ground yourself with some mindfulness exercises. Focus on the present moment.",
                "Try progressive muscle relaxation to calm your body and mind."
            ],
            quotes: [
                "Calmness is the cradle of power. – Josiah Gilbert Holland",
                "Do not anticipate trouble, or worry about what may never happen. Keep in the sunlight. – Benjamin Franklin",
                "Nothing in the affairs of men is worthy of great anxiety. – Plato",
                "Anxiety is the dizziness of freedom. – Søren Kierkegaard"
            ]
        }
    };

    // Handle mood card selection
    moodCards.forEach(card => {
        card.addEventListener('click', () => {
            const mood = card.getAttribute('data-mood');
            
            // Randomly select an activity and quote
            const randomActivity = recommendationsMap[mood].activities[Math.floor(Math.random() * recommendationsMap[mood].activities.length)];
            const randomQuote = recommendationsMap[mood].quotes[Math.floor(Math.random() * recommendationsMap[mood].quotes.length)];

            // Set the selected activity and quote
            activityText.textContent = randomActivity;
            quoteText.textContent = randomQuote;

            recommendations.style.display = 'block';
            body.style.backgroundColor = mood === 'happy' ? '#FFF59D' : mood === 'stressed' ? '#FFEBEE' : mood === 'tired' ? '#E3F2FD' : '#F1F8E9';
        });
    });

    // Try again button (reset mood)
    tryAgainBtn.addEventListener('click', () => {
        recommendations.style.display = 'none';
    });

    // Joke generator 
    const jokes = [
        "Why don't skeletons fight each other? They don't have the guts!",
        "What do you call fake spaghetti? An impasta!",
        "Why don’t eggs tell jokes? They might crack up!",
        "Why don’t some couples go to the gym? Because some relationships don’t work out!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "How do you organise a space party? You planet!",
        "Why did the bicycle fall over? It was two-tired.",
        "How does a penguin build its house? Igloos it together.",
        "What did the ocean say to the beach? Nothing, it just waved.",
        "Why did the math book look sad? Because it had too many problems."
    ];
    let usedJokes = [];

    // Function to get a random joke without repetition
    function getJoke() {
        if (jokes.length === 0) {
            alert("You've heard all the jokes! Let's start over.");
            usedJokes = []; 
        }

        const availableJokes = jokes.filter(joke => !usedJokes.includes(joke));
        const randomIndex = Math.floor(Math.random() * availableJokes.length);
        const selectedJoke = availableJokes[randomIndex];

        usedJokes.push(selectedJoke); 
        return selectedJoke;
    }

    // Joke button functionality
    jokeBtn.addEventListener('click', () => {
        const selectedJoke = getJoke();
        jokeDiv.textContent = selectedJoke;

        jokeDiv.classList.remove('hide');
        jokeDiv.classList.add('show');
        
        setTimeout(() => {
            jokeDiv.classList.remove('show');
            jokeDiv.classList.add('hide');
        }, 10000); 
    });

    // Breathing exercise button
    breathingBtn.addEventListener('click', () => {
        timerDiv.innerHTML = '';

        // Create the breathing circle
        const breathingCircle = document.createElement('div');
        breathingCircle.classList.add('breathing-circle');
        timerDiv.appendChild(breathingCircle);

        let phaseCount = 0; 

        // Function to start the animation
        const startBreathingAnimation = () => {
        
            breathingCircle.style.transition = 'none'; 
            breathingCircle.style.transform = 'scale(1)'; 
            breathingCircle.classList.remove('inhale', 'hold', 'exhale'); 

            setTimeout(() => {
                breathingCircle.style.transition = 'transform 12s ease-in-out'; 

                if (phaseCount === 0) {
                    breathingCircle.classList.add('inhale');
                } else if (phaseCount === 1) {
                    breathingCircle.classList.add('hold'); 
                } else if (phaseCount === 2) {
                    breathingCircle.classList.add('exhale'); 
                }

                // Increment phase and stop after one complete cycle
                phaseCount++;
                if (phaseCount > 2) {
                    phaseCount = 0; 
                    timerDiv.textContent = 'Well done! You completed the exercise!';
                }
            }, 200); 
        };
        startBreathingAnimation();
    });

    // Open User Manual Modal
    manualBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close Modal Button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close Modal when Clicking Outside Modal Content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
