// Afrikaans Word Learning App - Main Application Logic

class AfrikaansLearningApp {
    constructor() {
        this.currentMode = 'flashcards';
        this.difficulty = 'beginner';
        this.vocabulary = [];
        this.currentIndex = 0;
        this.score = 0;
        this.totalQuestions = 0;
        this.knownWords = new Set();
        this.stats = this.loadStats();
        this.matchingPairs = [];
        this.selectedCards = [];
        this.matchedPairs = 0;
        this.matchingTimer = 0;
        this.matchingInterval = null;
        
        this.init();
    }
    
    init() {
        this.loadVocabulary();
        this.setupEventListeners();
        this.updateStats();
        this.startFlashcards();
    }
    
    loadVocabulary() {
        this.vocabulary = this.shuffleArray([...vocabularyDatabase[this.difficulty]]);
    }
    
    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.switchMode(mode);
            });
        });
        
        // Difficulty selector
        document.getElementById('difficulty-select').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            this.loadVocabulary();
            this.restartCurrentMode();
        });
        
        // Flashcard controls
        document.getElementById('flashcard').addEventListener('click', () => {
            this.flipCard();
        });
        
        document.getElementById('flashcard-prev').addEventListener('click', () => {
            this.previousCard();
        });
        
        document.getElementById('flashcard-next').addEventListener('click', () => {
            this.nextCard();
        });
        
        document.getElementById('flashcard-know').addEventListener('click', () => {
            this.markAsKnown();
        });
        
        document.getElementById('speak-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.speakWord();
        });
        
        // Quiz controls
        document.getElementById('quiz-next').addEventListener('click', () => {
            this.nextQuizQuestion();
        });
        
        document.getElementById('quiz-restart').addEventListener('click', () => {
            this.startQuiz();
        });
        
        // Matching game controls
        document.getElementById('matching-restart').addEventListener('click', () => {
            this.startMatchingGame();
        });
        
        // Stats controls
        document.getElementById('reset-progress').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
                this.resetProgress();
            }
        });
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.mode === mode) {
                tab.classList.add('active');
            }
        });
        
        // Update content visibility
        document.querySelectorAll('.mode-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.getElementById(`${mode}-mode`).classList.add('active');
        
        // Initialize the mode
        switch(mode) {
            case 'flashcards':
                this.startFlashcards();
                break;
            case 'quiz':
                this.startQuiz();
                break;
            case 'matching':
                this.startMatchingGame();
                break;
            case 'stats':
                this.updateStats();
                break;
        }
    }
    
    restartCurrentMode() {
        this.switchMode(this.currentMode);
    }
    
    // Flashcards Mode
    startFlashcards() {
        this.currentIndex = 0;
        this.loadVocabulary();
        this.showCard();
    }
    
    showCard() {
        if (this.vocabulary.length === 0) return;
        
        const card = this.vocabulary[this.currentIndex];
        const flashcard = document.getElementById('flashcard');
        flashcard.classList.remove('flipped');
        
        document.getElementById('flashcard-word').textContent = card.afrikaans;
        document.getElementById('flashcard-translation').textContent = card.english;
        document.getElementById('flashcard-example').textContent = card.example;
        
        // Update progress
        const progress = ((this.currentIndex + 1) / this.vocabulary.length) * 100;
        document.getElementById('flashcard-progress').style.width = `${progress}%`;
        document.getElementById('flashcard-counter').textContent = 
            `Card ${this.currentIndex + 1} of ${this.vocabulary.length}`;
    }
    
    flipCard() {
        document.getElementById('flashcard').classList.toggle('flipped');
    }
    
    nextCard() {
        this.currentIndex = (this.currentIndex + 1) % this.vocabulary.length;
        this.showCard();
    }
    
    previousCard() {
        this.currentIndex = (this.currentIndex - 1 + this.vocabulary.length) % this.vocabulary.length;
        this.showCard();
    }
    
    markAsKnown() {
        const word = this.vocabulary[this.currentIndex].afrikaans;
        this.knownWords.add(word);
        this.saveStats();
        this.updateStats();
        
        // Visual feedback
        const btn = document.getElementById('flashcard-know');
        btn.textContent = '✓ Marked!';
        setTimeout(() => {
            btn.textContent = 'I Know This';
        }, 1000);
        
        this.nextCard();
    }
    
    speakWord() {
        const word = this.vocabulary[this.currentIndex].afrikaans;
        
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'af-ZA'; // Afrikaans
            utterance.rate = 0.8; // Slightly slower for learning
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-speech is not supported in your browser.');
        }
    }
    
    // Quiz Mode
    startQuiz() {
        this.currentIndex = 0;
        this.score = 0;
        this.totalQuestions = Math.min(10, this.vocabulary.length);
        this.loadVocabulary();
        
        document.getElementById('quiz-score').textContent = this.score;
        document.getElementById('quiz-total').textContent = this.totalQuestions;
        document.getElementById('quiz-next').style.display = 'none';
        document.getElementById('quiz-restart').style.display = 'none';
        document.getElementById('quiz-feedback').textContent = '';
        document.getElementById('quiz-feedback').className = 'quiz-feedback';
        
        this.showQuizQuestion();
    }
    
    showQuizQuestion() {
        if (this.currentIndex >= this.totalQuestions) {
            this.endQuiz();
            return;
        }
        
        const question = this.vocabulary[this.currentIndex];
        const isAfrikaansToEnglish = Math.random() > 0.5;
        
        // Generate options
        const correctAnswer = isAfrikaansToEnglish ? question.english : question.afrikaans;
        const options = [correctAnswer];
        
        // Add 3 wrong options
        while (options.length < 4) {
            const randomWord = this.vocabulary[Math.floor(Math.random() * this.vocabulary.length)];
            const option = isAfrikaansToEnglish ? randomWord.english : randomWord.afrikaans;
            if (!options.includes(option)) {
                options.push(option);
            }
        }
        
        this.shuffleArray(options);
        
        // Display question
        const questionText = isAfrikaansToEnglish 
            ? `What is the English translation of "${question.afrikaans}"?`
            : `What is the Afrikaans translation of "${question.english}"?`;
        
        document.getElementById('quiz-question-text').textContent = questionText;
        
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';
        
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = option;
            btn.addEventListener('click', () => this.checkAnswer(option, correctAnswer));
            optionsContainer.appendChild(btn);
        });
        
        // Update progress
        const progress = ((this.currentIndex + 1) / this.totalQuestions) * 100;
        document.getElementById('quiz-progress').style.width = `${progress}%`;
        document.getElementById('quiz-counter').textContent = 
            `Question ${this.currentIndex + 1} of ${this.totalQuestions}`;
        
        document.getElementById('quiz-feedback').textContent = '';
        document.getElementById('quiz-feedback').className = 'quiz-feedback';
    }
    
    checkAnswer(selected, correct) {
        const isCorrect = selected === correct;
        
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correct) {
                btn.classList.add('correct');
            } else if (btn.textContent === selected && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Show feedback
        const feedback = document.getElementById('quiz-feedback');
        if (isCorrect) {
            this.score++;
            feedback.textContent = '✓ Correct! Well done!';
            feedback.className = 'quiz-feedback correct';
        } else {
            feedback.textContent = `✗ Incorrect. The correct answer is: ${correct}`;
            feedback.className = 'quiz-feedback incorrect';
        }
        
        document.getElementById('quiz-score').textContent = this.score;
        document.getElementById('quiz-next').style.display = 'inline-block';
    }
    
    nextQuizQuestion() {
        this.currentIndex++;
        document.getElementById('quiz-next').style.display = 'none';
        this.showQuizQuestion();
    }
    
    endQuiz() {
        const accuracy = Math.round((this.score / this.totalQuestions) * 100);
        
        document.getElementById('quiz-question-text').textContent = 
            `Quiz Complete! You scored ${this.score} out of ${this.totalQuestions} (${accuracy}%)`;
        
        document.getElementById('quiz-options').innerHTML = '';
        
        const feedback = document.getElementById('quiz-feedback');
        feedback.className = 'quiz-feedback';
        
        if (accuracy >= 80) {
            feedback.textContent = '🎉 Excellent work! You\'re mastering Afrikaans!';
            feedback.className = 'quiz-feedback correct';
        } else if (accuracy >= 60) {
            feedback.textContent = '👍 Good job! Keep practicing!';
            feedback.className = 'quiz-feedback correct';
        } else {
            feedback.textContent = '💪 Keep trying! Practice makes perfect!';
            feedback.className = 'quiz-feedback incorrect';
        }
        
        document.getElementById('quiz-next').style.display = 'none';
        document.getElementById('quiz-restart').style.display = 'inline-block';
        
        // Update stats
        this.stats.totalQuizzes++;
        this.stats.totalCorrect += this.score;
        this.stats.totalQuestions += this.totalQuestions;
        this.saveStats();
    }
    
    // Matching Game Mode
    startMatchingGame() {
        this.matchedPairs = 0;
        this.selectedCards = [];
        this.matchingTimer = 0;
        
        // Clear any existing interval
        if (this.matchingInterval) {
            clearInterval(this.matchingInterval);
        }
        
        // Start timer
        this.matchingInterval = setInterval(() => {
            this.matchingTimer++;
            this.updateMatchingTimer();
        }, 1000);
        
        // Select 6 random words for matching
        const words = this.shuffleArray([...this.vocabulary]).slice(0, 6);
        
        // Create pairs
        this.matchingPairs = [];
        words.forEach((word, index) => {
            this.matchingPairs.push({
                id: index,
                text: word.afrikaans,
                type: 'afrikaans',
                matched: false
            });
            this.matchingPairs.push({
                id: index,
                text: word.english,
                type: 'english',
                matched: false
            });
        });
        
        this.shuffleArray(this.matchingPairs);
        this.renderMatchingGrid();
        
        document.getElementById('matching-score').textContent = this.matchedPairs;
        document.getElementById('matching-total').textContent = words.length;
    }
    
    renderMatchingGrid() {
        const grid = document.getElementById('matching-grid');
        grid.innerHTML = '';
        
        this.matchingPairs.forEach((pair, index) => {
            const card = document.createElement('div');
            card.className = 'matching-card';
            card.textContent = pair.text;
            card.dataset.index = index;
            
            if (pair.matched) {
                card.classList.add('matched');
            }
            
            card.addEventListener('click', () => this.selectMatchingCard(index));
            grid.appendChild(card);
        });
    }
    
    selectMatchingCard(index) {
        const card = this.matchingPairs[index];
        
        // Ignore if already matched
        if (card.matched) return;
        
        // Ignore if already selected
        if (this.selectedCards.some(c => c.index === index)) return;
        
        // Add to selection
        this.selectedCards.push({ index, card });
        
        // Update UI
        const cardElement = document.querySelector(`[data-index="${index}"]`);
        cardElement.classList.add('selected');
        
        // Check if we have 2 cards selected
        if (this.selectedCards.length === 2) {
            this.checkMatchingPair();
        }
    }
    
    checkMatchingPair() {
        const [first, second] = this.selectedCards;
        
        // Check if they match (same id, different type)
        if (first.card.id === second.card.id && first.card.type !== second.card.type) {
            // Match!
            this.matchingPairs[first.index].matched = true;
            this.matchingPairs[second.index].matched = true;
            this.matchedPairs++;
            
            document.getElementById('matching-score').textContent = this.matchedPairs;
            
            setTimeout(() => {
                this.renderMatchingGrid();
                this.selectedCards = [];
                
                // Check if game is complete
                if (this.matchedPairs === 6) {
                    this.endMatchingGame();
                }
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                document.querySelectorAll('.matching-card.selected').forEach(card => {
                    card.classList.remove('selected');
                    card.classList.add('wrong');
                });
                
                setTimeout(() => {
                    this.renderMatchingGrid();
                    this.selectedCards = [];
                }, 500);
            }, 500);
        }
    }
    
    endMatchingGame() {
        clearInterval(this.matchingInterval);
        
        alert(`🎉 Congratulations! You completed the matching game in ${this.formatTime(this.matchingTimer)}!`);
        
        // Update best time
        if (!this.stats.bestMatchingTime || this.matchingTimer < this.stats.bestMatchingTime) {
            this.stats.bestMatchingTime = this.matchingTimer;
            this.saveStats();
        }
    }
    
    updateMatchingTimer() {
        document.getElementById('matching-timer').textContent = this.formatTime(this.matchingTimer);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Statistics
    updateStats() {
        document.getElementById('total-words-learned').textContent = this.knownWords.size;
        
        const accuracy = this.stats.totalQuestions > 0 
            ? Math.round((this.stats.totalCorrect / this.stats.totalQuestions) * 100)
            : 0;
        document.getElementById('quiz-accuracy').textContent = `${accuracy}%`;
        
        document.getElementById('total-quizzes').textContent = this.stats.totalQuizzes;
        
        const bestTime = this.stats.bestMatchingTime 
            ? this.formatTime(this.stats.bestMatchingTime)
            : '--';
        document.getElementById('best-matching-time').textContent = bestTime;
        
        // Display known words
        const wordsList = document.getElementById('known-words-list');
        wordsList.innerHTML = '';
        
        if (this.knownWords.size === 0) {
            wordsList.innerHTML = '<p style="color: #888; text-align: center;">No words marked as known yet. Start learning!</p>';
        } else {
            this.knownWords.forEach(word => {
                const wordItem = document.createElement('div');
                wordItem.className = 'word-item';
                wordItem.textContent = word;
                wordsList.appendChild(wordItem);
            });
        }
    }
    
    loadStats() {
        const saved = localStorage.getItem('afrikaansLearningStats');
        if (saved) {
            const stats = JSON.parse(saved);
            this.knownWords = new Set(stats.knownWords || []);
            return stats;
        }
        return {
            totalQuizzes: 0,
            totalCorrect: 0,
            totalQuestions: 0,
            bestMatchingTime: null,
            knownWords: []
        };
    }
    
    saveStats() {
        const stats = {
            ...this.stats,
            knownWords: Array.from(this.knownWords)
        };
        localStorage.setItem('afrikaansLearningStats', JSON.stringify(stats));
    }
    
    resetProgress() {
        this.knownWords.clear();
        this.stats = {
            totalQuizzes: 0,
            totalCorrect: 0,
            totalQuestions: 0,
            bestMatchingTime: null,
            knownWords: []
        };
        this.saveStats();
        this.updateStats();
        alert('All progress has been reset.');
    }
    
    // Utility functions
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new AfrikaansLearningApp();
});
