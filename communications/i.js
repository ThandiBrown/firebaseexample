import { readDB, writeDB } from './data/talkToDatabase.js'


const questions = [
    "1. What is the smallest thing for which you are grateful?",
    "2. Who has had the most positive impact on your life?",
    "3. If you could use a time machine, would you rather have one that only goes back in time or only goes forward?",
    "4. If you got a promotion, a job, a college acceptance, an accolade/award, or just generally accomplished something major, who is the first person you'd tell and how do you think they'd react?",
    "5. If you were an inanimate object, what would you be and why?",
    "6. Where do you wish you had grown up?",
    "7. If you could be good at any profession without having to receive the accompanying education or trade experience, which would you choose?",
    "8. What is something you're terrible at but wish you could do well?",
    "9. What is the quality you admire the most in the person you dislike the most?",
    "10. What was the most recent thing that made you cry?",
    "11. What are the books/movies/games that never get old and always make you feel better when you get down?",
    "12. What is the most trivial thing about which you have a strong opinion?",
    "13. If you could be any mythical creature, what would you be and why?",
    "14. If you've had more than one job, which job taught you the most?",
    "15. If you could change one thing about yourself physically, what would you change? ",
    "16. What single event or decision do you think most affected the rest of your life? Was there a turning point in your life?",
    "17. What is the one thing you've made that you're the most proud of?",
    "18. Some historical figures have epithets attached to their names, like The Mad or The Wise. What would you like yours to be?",
    "19. What was the best year of your life? The worst? ",
    "20. What one thing, whether it's something you did or something you made or something you caused to happen, would you like to be remembered by?",
    "21. What has been the biggest change of heart you've had? Have you ever started off on one side of an issue and wound up on the other? What influenced that change?",
    "22. What is your biggest non-academic, non work-related accomplishment?",
    "23. What is your biggest academic or work-related accomplishment? ",
    "24. What is something you've done/felt/seen/etc. that you wish you could experience again for the first time?",
    "25. If you could erase one thing or event from your memory, what would you choose?",
    "26. Is there something about you that people assume because of your appearance or demeanour? What is a trait or preference you have that people don't expect you to have?",
    "27. If you were a character in a movie, book, or television show, what genre would you live in?",
    "28. What is the hardest way you've learned an important lesson?",
    "29. What clich\u00e9 do you think is bullshit? What clich\u00e9 do you think holds truth?",
    "30. What do you fear, despite having no real reason to do so? Basically, what is an irrational fear you have? ",
    "31. Imagine that you could choose when and how you die. At what age would you like to die (no maximum here) and how would you like to go?",
    "32. What character archetype is closest to your personality?",
    "33. What was the happiest moment of your life so far?",
    "34. What is one childhood memory that you remember especially well?",
    "35. Is there a song/movie/food/etc. that strongly reminds you of someone whenever you experience it? Who does it remind you of?",
    "36. What is your ideal birthday? Not the date, but rather your ideal way to spend the day. ",
    "37. Are there any smells that bring back memories for you? What are they, and what memories do they elicit? ",
    "38. What is the closest you've ever come to dying?",
    "39. Do you have a personal mantra? If so, what is it?",
    "40. What is the most memorable meal you've ever had? (It can be good or bad.) What made it so memorable?",
    "41. What's the worst advice you've ever been given?",
    "42. In what ways do you benefit the world?",
    "43. What fact about yourself took you the longest to understand or accept?",
    "44. What is your least popular or most controversial opinion?",
    "45. If you could live in another time period but stay in the same place you live now, when would you want to live? ",
    "46. Do you have any conspiracy theories? If so, what are they?",
    "47. What is the \"strangest\" thing you believe in? Do you believe in the supernatural? Heaven, angels, ghosts? Luck, fate, magic? Mind reading, lizard people, the Illuminati? Where do you draw the line of belief and disbelief?",
    "48. What fictional character do you most relate to?",
    "49. What have you been meaning to do but haven't yet done? Why haven't you done it? ",
    "50. Let's say that regardless of what job you have, you'll make $100,000 a year (\u00a378,000; \u20ac90,000), enough to live comfortably without having to worry about expenses. What job would you choose to have if money were no object?",
    "51. What do you get the most compliments about?",
    "52. Have you ever had an epiphany? What was it about, and what sparked the realisation?",
    "53. What is the most important quality you look for in a friend? A romantic partner?",
    "54. What is a childhood habit or preference that you'll never outgrow?",
    "55. What is your favourite word and why?",
    "56. Which of your flaws are you most proud of?",
    "57. What is the most ordinary-seeming thing that you find fascinating?",
    "58. What lesson have you had to learn again and again?",
    "59. What was your favourite thing about the place you grew up?",
    "60. What scientific or technological advance blows your mind? Is there any technology that seems so futuristic and advanced you're surprised it actually exists?",
    "61. If you could ask your future self one thing, what would it be?",
    "62. What is something that gets cooler/more interesting the more you learn about it? ",
    "63. What would you title your memoir? ",
    "64. What was the hardest decision you've ever made?",
    "65. What word would your best friend use to describe you? Your parents? Your significant other (if applicable)?",
    "66. In what way would you most like to become famous?",
    "67. How would you summarise your life so far in one sentence?",
    "68. You're old and on your deathbed. With your last breath, you may deliver your last words to anyone you know. What do you say and who do you say it to?",
    "69. If seasons never changed, which would you most like to live in eternally?",
    "70. What is the best advice you've ever received? ",
    "71. You have one year to live: how do you spend it?",
    "72. Think of the best teacher you've ever had. What did they teach, and what made them so special?",
    "73. What is something you never thought you'd be able to do, until you actually did it? ",
    "74. If you could go back and relive one day in your life without changing anything about it, which day would you revisit?",
    "75. If you had the power to completely eradicate one disease, which would you choose to abolish?",
    "76. If you had the power to completely solve one social or political issue affecting the world today, which would you choose?",
    "77. What was the scariest moment of your life thus far?",
    "78. If you lived in a colonial or Medieval village, what would your job be? ",
    "79. Have you ever desired or longed for something, but once you got it, discovered it was overrated? ",
    "80. What is something you've done that you recommend everyone do before they die?",
    "81. What do you know isn't real, but want badly for it to exist?",
    "82. What is the greatest physical pain you've ever felt?",
    "83. What is something you don't realise is weird until you really think about it?",
    "84. What's your favourite joke you've ever heard?",
    "85. Is there something you wish everybody knew about you without you having to tell them?",
    "86. What trait do you admire in others but don't possess yourself?",
    "87. What question do you most hate being asked?",
    "88. What is something other people admire about you?",
    "89. What's the best outcome of a complete accident you've experienced in your life?",
    "90. Have you ever gotten the giggles in an inappropriate place? Where was it? ",
    "91. What's the best lesson you've learned from a difficult situation?",
    "92. What do you think \"success\" means? How do you define it in your own life?",
    "93. What's your favourite article of clothing you own?",
    "94. What's something you wish you enjoyed but never can seem to?",
    "95. If you could play any instrument or learn any language in two hours, which would you choose and how would you use your talent? ",
    "96. Have you ever challenged or questioned a belief you held for a long time? What prompted it and what was the result?",
    "97. What, if anything, is too serious to be joked about?",
    "98. What's the coolest project you've ever worked on? ",
    "99. Are you currently pursuing what makes you happy? Why or why not?",
    "100. What did you know was a mistake as soon as you decided to do it, and why did you go through with it anyway?",
    "101. In what ways are you stubborn?",
    "102. What's a brief summary of your outlook on life?",
    "103. What are you most likely to be arrested for (even if you don't do anything illegal\u2014what crime do you think you're most likely to commit)?",
    "104. Think of your biggest regret. If you could go back in time and make a decision to keep it from happening, would you?",
    "105. If you could be any animal, what would you be and why?",
    "106. What is the worst thing about the place you live?",
    "107. What is the best thing about the place you live?",
    "108. Does anybody beside yourself know your deepest secret? Do you ever intend to tell anyone?",
    "109. What is one small change you made in your life that had a much bigger impact that you anticipated?",
    "110. What historical event would you most like to have experienced? ",
    "111. Do you believe in fate, the idea that \"whatever is meant to happen will happen\"? Or do you believe more in a universe governed mainly by chaos and the unknown? ",
    "112. What experience are you most proud of yourself for making it through? ",
    "113. In a \"Freaky Friday\" situation where you woke up in someone else's body, who would you like to be for a day and have them inhabit your body?",
    "114. What's a quirk of yours that few people know about? ",
    "115. What's the craziest thing you've ever done?",
    "116. Are you currently holding a grudge against anyone or anything? ",
    "117. What small thing annoys you to an irrational degree?",
    "118. Have you gone through any phases in your life? What is the most notable one?",
    "119. What historical figure do you most admire and why?",
    "120. Was there ever a moment when you thought you were going to die?",
    "121. What was the best opportunity you ever received?",
    "122. What always makes you nostalgic?",
    "123. What would you like to accomplish before the year is over? ",
    "124. Have you ever been offered a good opportunity but refused? What was the situation? ",
    "125. Would you prefer your family to be smaller or larger than it is now, or neither? Do you wish you were more involved with your extended family?",
    "126. What is something you're hypocritical about; something you believe but have a hard time sticking to in practise?",
    "127. Has anyone close to you ever died? Was there anything that helped you to move past their death? ",
    "128. What is something you're inherently bad at, no matter how hard you try to improve?",
    "129. Do you have any inherent talents? ",
    "130. What small, insignificant thing gives you joy?",
    "131. If you could live anywhere in the world in any kind of domicile, and money was no object, where would you live and what would your dwelling be like?",
    "132. What is one thing you've done/seen/eaten/etc. that turned out to be really good, even though you initially didn't expect it to be? ",
    "133. In the movie Inside Out, each person has a set of \"core memories\" that define who they are and how they behave. What's one of yours?",
    "134. What is the biggest mistake you've made that actually turned out alright?",
    "135. What's the best decision you've ever made?",
    "136. When you're sick, what are some things you eat/drink/watch/etc. to be comfortable?",
    "137. What are some core principles you have that you'll never give up or change?",
    "138. Have you ever invented something? It doesn't have to be a traditional product either, it can be creating a new dish, coining a term.",
    "139. What cause do you strongly support, even though it wouldn't directly benefit you?",
    "140. What book, movie, film, or video game had the best ending? ",
    "141. You have enough money to make a sizeable charitable donation\u2014to which charity do you donate it and why? Or, if you choose not to go through a charity, how would you spend this money in a philanthropic way? ",
    "142. What is something weird you do that you wonder if other people do as well?",
    "143. Suddenly you're in a horror film, running from a masked murderer. Your only companion is the last person you texted, and your only weapon is whatever is currently closest to your left hand. What is the movie like and do you think you could survive?",
    "144. What is one thing you're tired of telling/explaining to people?",
    "145. What embarrassing memory will forever be burned into your mind?",
    "146. What was the busiest day of your life thus far?",
    "147. What was the greatest day of your life thus far?",
    "148. What was the worst day of your life thus far?",
    "149. What is one thing you're good at that people don't expect?",
    "150. In what way do you differ most from your parents?",
    "151. In what way do you differ most from your best friend?",
    "152. What stereotype are you most like?",
    "153. What is one thing you're proud you haven't done?",
    "154. What is something that's difficult for you but easy for most other people?",
    "155. What is something that's easy for you but difficult for most other people?",
    "156. What are you glad you learned as a child?",
    "157. If you could know either when you die or how, which would you choose, if either?",
    "158. What is something you had to learn the hard way?",
    "159. What is something you want but will never have?",
    "160. If you could know for certain the answer to any question, what would that question be?",
    "161. What is a quote that speaks to you, and why do you like it?",
    "162. What advice do you wish you'd received earlier?",
    "163. What was the hardest time of your life, and how did you make it through?",
    "164. What is the best compliment you've ever received? ",
    "165. What character trait instantly makes you respect someone?",
    "166. What is the best compliment you've ever given someone?",
    "167. What is a fear you've faced and how did you face it?",
    "168. What is an \"everyday evil\" you experience often? Something banal but deeply unfair.",
    "169. What person you know do you look up to most and why?",
    "170. Has anyone ever saved your life? Have you ever saved someone else's?",
    "171. What expensive thing is absolutely worth the money?",
    "172. If you could change your name (first, last, middle, or any combination of the three), what would you change it to and why?",
    "173. What historical figure would you most like to sit and have a conversation with over tea?",
    "174. Who do you wish was still alive?",
    "175. What is a story you always fall back on\u2014one you've told so many times you nearly have it memorised?",
    "176. How has your year been going?",
    "177. There is an old, old man who lives deep in the forest. He is immortal, and was born in the year 0. You may ask him one question. What do you ask?",
    "178. How are you? No, really. How are you? Not \"Fine,\" not \"Good, thanks, and you?\" How are you really? Now, today, at this moment?",
    "179. What were you severely underprepared for?",
    "180. What's the most selfish thing you've done?",
    "181. What's the most selfless thing you've done?",
    "182. If you could live in any fictional world, where would it be and why?",
    "183. What is your favourite question to answer?",
    "184. What is the biggest punishment you've ever received? Getting grounded, disciplinary file, prison?",
    "185. What about yourself is completely different from what you were like 10 years ago?",
    "186. What about yourself hasn't changed in the last 10 years?",
    "187. If you could erase one memory from your mind, what would it be and why?",
    "188. What wouldn't you do for someone you love?",
    "189. If you could enhance one of your senses twofold (e.g. your hearing would be twice as good as it is now), which would you choose to enhance?",
    "190. What's the best gift you've ever received? Who gave it to you?",
    "191. What's the best gift you've ever given? Who did you give it to?",
    "192. What changed the way you see the world?",
    "193. If you died today, what would be your biggest regret?",
    "194. What is a completely rational, justified fear that you have?",
    "195. What is something you love that most people hate?",
    "196. What is something you hate that most people love?",
    "197. What do you wish was possible? ",
    "198. Who was the last person you called, and what did you talk about?",
    "199. What will never cease to make you smile?",
    "200. What will always be funny to you?",
    "201. What is something that happened to you, despite the odds being stacked against you?",
    "202. If you were a superhero, what would be your name, costume, and catchphrase? Who would you fight? ",
    "203. What was the last song that got stuck in your head?",
    "204. What is the longest or most complex thing you have memorised?",
    "205. Assume that god exists. For our purposes, he created the universe and has witnessed everything that has happened since. He also has control over everyone's lives and destinies. Once a millennium, he appears to somebody in his human form and will answer one question with absolute truth. He has chosen you. What do you ask him? ",
    "206. If you could have any superpower for just one day, but you get to choose the superpower and when you activate it, what would you choose and when would you use it? ",
    "207. In what way have you experienced the saying, \"You don't know what you have until you lose it\"?",
    "208. Someone you love will die at the end of today. Only you know this; they don't. How do you spend your last day with them and when do you tell them that they're going to die, if ever? ",
    "209. What do you wish you remembered better?",
    "210. Who is the single best person you have ever met? What makes them the best?",
    "211. What is something you know is going to happen, but hasn't yet?",
    "212. Have you ever gotten a \"hunch\" about something that turned out to be true?",
    "213. What is the most dangerous thing you've ever done, and why did you do it? ",
    "214. What do you think is worth dying for, if anything? ",
    "215. Is there anything you have vowed never to do?",
    "216. Under what circumstances do you think you could kill someone, if any?",
    "217. What's your favourite memory with your best friend?",
    "218. What is a profession you admire but could never be a part of?",
    "219. What is something you enjoyed doing but would never do again?",
    "220. What object best defines who you are?",
    "221. What is the strongest emotional connection you've ever felt with a person? (It doesn't have to be romantic.)",
    "222. Do you have or have you ever had a nemesis?",
    "223. What's the biggest fight you've gotten into, and what was it about?",
    "224. What would the ideal version of your life look like?",
    "225. What was the most recent thing that made you belly laugh?",
    "226. What is the dumbest purchase you've ever made?",
    "227. If you had to write your own eulogy to be read at your funeral, what would it say in brief?",
    "228. You have the opportunity to give a 10 minute speech which will be broadcast worldwide. What do you say?",
    "229. How long do you think you could survive in a remote forest with no tools?",
    "230. What person in your life would you most want to be stuck in an elevator with for 24 hours?",
    "231. What is the most obscure fact you know?",
    "232. Is there something you want to tell someone, but haven't? Why haven't you done it, and how do you think they would react if you told them?",
    "233. What's a rant you've been holding in?",
    "234. What subject could you teach a college course on? What would be the title of the course, and what units would you cover?",
    "235. Have you ever had a recurring dream or nightmare? What was it?",
    "236. What gives you hope for the future?",
    "237. What is something you fantasise about often?",
    "238. What do you find yourself thinking about just before you fall asleep?",
    "239. What was your favourite family tradition growing up? Have you created a tradition of your own?",
    "240. What is something you're embarrassed to admit you enjoy? Why are you embarrassed about it?",
    "241. What if the first thing you hope people notice about you?",
    "242. When was the last time you did something nice for someone completely unprompted?",
    "243. What is a misconception people have about your profession?",
    "244. What do you want written on your headstone?",
    "245. What situation made you feel like a complete idiot?",
    "246. What outfit makes you feel invincible?",
    "247. Have you ever hit \u201crock bottom\u201d? What did it look and feel like to you? What situations or decisions led to it? How did you get out, or have you gotten out yet?",
    "248. What current trend do you find troubling and why?",
    "249. What is the worst thing in your life that has resulted from a complete misunderstanding or miscommunication?",
    "250. What are you currently worrying about, if anything? What could happen to make you stop worrying about it?",
    "251. Do you think humanity will go extinct? How and when do you think it will happen?",
    "252. Is there a problem or situation for which you could use some advice?",
    "253. Has your gut feeling or first impression about something ever been wrong?",
    "254. What is your catchphrase, or something you find yourself saying often?",
    "255. At a party, are you the social butterfly who chats with everyone, the intense conversationalist who gets really deep with someone, the person who showed up for the snacks, the person getting drunk, the person dancing, the host, the person hanging around the edges and not talking much, or someone else?",
    "256. A stranger is inhabiting your body for the day. What are some tips you'd give them?",
    "257. Are you currently waiting for something? What are you waiting for? What are the best and worst possible scenarios?",
    "258. Is there someone you knew once but have lost touch with? What happened? Do you know where they are now, and how they're doing?",
    "259. What is something you love, but can't recommend to anyone you know because you know they won't like it?",
    "260. Who was your childhood hero? Do you still look up to them? Why or why not?",
    "261. What's something you've done so many times, you could do it with your eyes closed?",
    "262. What instantly makes you feel like a child again?",
    "263. What do you think happens after we die, if anything?",
    "264. Have you ever written a thank-you note to someone who created or helped create something you enjoy? If not, who would you write to and what would you thank them for?",
    "265. What is your perfect meal? Describe it\u2014everything from the company to the setting to the music to, of course, the food.",
    "266. What are people not grateful enough for?",
    "267. What is the smallest thing that can ruin your day?",
    "268. Is there anyone you envy? What is it about them that you envy? If not, what is something people might envy you for?",
    "269. What is the most recent thing (skill, technique, theory, subject, etc.) you taught yourself?",
    "270. What is something you wish people cared less about? How do you think the world would be better if people cared less about it?",
    "271. What is something you wish people cared more about? How do you think the world would be better if people cared more about it?",
    "272. How do you feel about the future right now? Are you nervous, excited, unenthused? ",
    "273.  Have you ever cried in public? If so, was the reason?",
    "274. Do you have an inside joke with friends or family? How did it begin?",
    "275. What immediately makes you think less of someone?",
    "276. What immediately makes you think more highly of someone?",
    "277. Who could you listen to for hours? It can be someone you know or someone you don't.",
    "278. What social custom do you wish would end and why?",
    "279. If a biopic were made of your life, which parts would you want to be left out and why?",
    "280. What were the longest five minutes you've ever experienced?",
    "281. Have you discovered anything about yourself in the past year?",
    "282. How would you want your children's childhoods to be different from your own?",
    "283. What's the quickest way to get you angry?",
    "284. Have you ever hidden something from your family or friends? How long did you hide it for, and why?",
    "285. How does the current generation of children differ from what children were like when you were younger? ",
    "286. How would your life change if you inherited $100,000 tomorrow?",
    "287. What's the strangest situation you've ever found yourself in?",
    "288. What is the best thing that happened to you this week?",
    "289. Do you have a nickname? If so, who gave it to you and how did it come about? If you could choose a nickname for yourself, what would you want it to be and why?",
    "290. What's the most beautiful view you've ever seen?",
    "291. How did you and your best friend (or significant other, if applicable) meet?",
    "292. What are you looking forward to?",
    "293. What activity makes you lose track of time? ",
    "294. What is the most useless talent or skill you possess? How and why did you learn it?",
    "295. If you opened a business, what type of business would it be? What would you name it?",
    "296. When you were a kid, were you excited to be a grownup? What about growing up excited you?",
    "297. Assume you have a lot of musical talent. If you started a band, how many people would be in it and which position would you be? What would you name it? What genre would you play?",
    "298. When was the last time you tried something new? What was it? Did you enjoy it?",
    "299. What's something you went through that you wouldn't wish on your worst enemy?",
    "300.  When do you feel like the best version of yourself?",
    "301. What keeps you up at night?",
    "302. Has a piece of media (book, film, play, song, etc.) ever changed the way you thought about the world?",
    "303. What is a conspiracy theory you believe to be true?",
    "304. If you were a ghost tied to one location in the afterlife, where would you haunt?",
    "305. What are the stories behind your scars/tattoos, if you have any?",
    "306. What is something you are confident you will never do in your life?"
];

loadingSettings();

function loadingSettings() {
    
    // let answers = JSON.parse(localStorage.getItem('answers')) || {};
    // writeDB({'info':JSON.stringify(answers)});
    
    readDB("", loadingPage);
}

function loadingPage(response) {
    // console.log("response")
    console.log(response[0]) 
    let answers = response[0];
    // return 
    const questionnaireDiv = document.getElementById("questionnaire");
    

    questions.forEach((question, index) => {
        let content = ['P', 'R', 'M', 'W'];
        let classes = ['question'];
        // if (index in answers && answers[index].length > 1) {
        //     answers[index] = answers[index].filter(item => content.includes(item));
        // }
        
        if (index % 2 == 0) {
            classes.push('grayed');
        }
        const questionDiv = document.createElement("div");
        questionDiv.classList.add(...classes);

        const questionText = document.createElement("p");
        questionText.textContent = question;
        
        if (index in answers && answers[index].length > 1) {
            questionText.classList.add('reddened');
        }
        questionDiv.appendChild(questionText);
        
        
        const buttonDiv = document.createElement("div");
        for (let value of content) {

            const buttonA = document.createElement("button");
            buttonA.textContent = value;
            buttonA.onclick = () => toggleAnswer(answers, index, value, buttonA);
            buttonDiv.appendChild(buttonA);
            
            if (index in answers && answers[index].includes(value)) {
                buttonA.classList.add("selected");
            }
        }
        
        questionDiv.appendChild(buttonDiv);
        questionnaireDiv.appendChild(questionDiv);
    });
    // scrollToLastSelected();
    // printOrganizedQuestions();
}


function toggleAnswer(answers, questionIndex, answer, selectedButton) {
    if (questionIndex in answers && answers[questionIndex].includes(answer)) {
        // If the same button is clicked again, deselect it
        answers[questionIndex].splice(answers[questionIndex].indexOf(answer), 1);
        
        selectedButton.classList.remove("selected");
    } else {
        // Select the clicked button and deselect the other one
        if (questionIndex in answers) {
            answers[questionIndex].push(answer);
        } else {
            answers[questionIndex] = [answer];
        }
        
        selectedButton.classList.add("selected");
        
    }

    // Save answers to localStorage
    // localStorage.setItem('answers', JSON.stringify(answers));
    writeDB({'info':JSON.stringify(answers)});

    console.log(`Question ${questionIndex + 1}: ${answer}`);
}

function scrollToLastSelected() {
    const selectedElements = document.querySelectorAll('div:not(:has(button.selected))');
    if (selectedElements.length > 0) {
        const firstElement = selectedElements[0];
        // const lastSelectedElement = selectedElements[selectedElements.length - 1];
        firstElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function printOrganizedQuestions() {
    /* 
        M - memories, 98
        P - personality, 127
        R - relationships, 30
        W - wants, 51
    */
    // Initialize the dictionary with keys M, P, R, W and empty arrays
    const questionDict = {
        M: [],
        P: [],
        R: [],
        W: []
    };

    // Select all the question divs
    const questions = document.querySelectorAll('.question');

    // Iterate through each question div
    questions.forEach(question => {
        // Find the first <p> element which contains the question title
        const questionTitle = question.querySelector('p').innerText;
        
        // Find the button that has the class "selected"
        const selectedButton = question.querySelector('button.selected');
        
        if (selectedButton) {
            // Get the text content of the selected button (M, P, R, or W)
            const selectedValue = selectedButton.innerText;
            
            // Add the question title to the appropriate list in the dictionary
            if (questionDict[selectedValue]) {
                questionDict[selectedValue].push(questionTitle);
            }
        }
    });

    console.log(questionDict);

}