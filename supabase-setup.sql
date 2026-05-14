-- Patte Ki Baat: Database Setup
-- Run this entire file in your Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS advice (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  language VARCHAR(10) NOT NULL,
  author_name TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type VARCHAR(10) NOT NULL DEFAULT 'any' CHECK (type IN ('morning', 'evening', 'any')),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS affirmations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  language VARCHAR(10) NOT NULL,
  hour_slot INTEGER NOT NULL CHECK (hour_slot >= 0 AND hour_slot <= 23),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE advice ENABLE ROW LEVEL SECURITY;
ALTER TABLE affirmations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read approved advice" ON advice FOR SELECT USING (approved = true);
CREATE POLICY "Auth users can insert advice" ON advice FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Public read affirmations" ON affirmations FOR SELECT USING (true);

-- SEED: Morning + Evening Advice
INSERT INTO advice (content, language, author_name, type, approved) VALUES
('Every morning is a fresh start. Choose how you want to show up today.', 'en', 'Maya', 'morning', true),
('The sun rises without hesitation. So can you.', 'en', 'Ravi', 'morning', true),
('Your only competition today is who you were yesterday.', 'en', 'Sarah', 'morning', true),
('Small steps forward are still forward.', 'en', 'Chen', 'morning', true),
('Drink water, take a breath, and remember: you are capable of more than you know.', 'en', 'Amara', 'morning', true),
('Today is a canvas. You are the artist.', 'en', 'Lucas', 'morning', true),
('The best project you will ever work on is you.', 'en', 'Priya', 'morning', true),
('Wake up with purpose. Even one small intention can change your whole day.', 'en', 'Omar', 'morning', true),
('You have survived every hard morning so far. You can do this one too.', 'en', 'Leila', 'morning', true),
('Mornings are for possibilities. Everything you need is already within you.', 'en', 'James', 'morning', true),
('Tonight, rest. You did enough today.', 'en', 'Anika', 'evening', true),
('Reflect on one kind thing you did today. It matters more than you think.', 'en', 'David', 'evening', true),
('Let go of what you could not control. Tomorrow is another chance.', 'en', 'Fatima', 'evening', true),
('You survived every hard day so far. This one too is done.', 'en', 'Carlos', 'evening', true),
('Close your eyes knowing you tried. That is always enough.', 'en', 'Mei', 'evening', true),
('The stars came out just for you tonight. Rest well.', 'en', 'Soo', 'evening', true),
('Who you are becoming is worth every difficult day.', 'en', 'Nina', 'evening', true),
('Your progress is real even when it is invisible. Keep going.', 'en', 'Arjun', 'evening', true),
('Tonight, be gentle with yourself. You are a work in progress, and that is beautiful.', 'en', 'Zara', 'evening', true),
('Every evening that you choose rest over guilt is an act of self-love.', 'en', 'Rafael', 'evening', true),
('Har subah ek nayi shuruaat hai. Aaj kaise banna chahte hain, yeh chunein.', 'hi', 'Maya', 'morning', true),
('Suraj bina jhijhak ke ugta hai. Aap bhi uth sakte hain.', 'hi', 'Ravi', 'morning', true),
('Aaj aapki ektamatra pratispardha kal ke aap hain.', 'hi', 'Sarah', 'morning', true),
('Chhote-chhote kadam bhi aage hi badhte hain.', 'hi', 'Amara', 'morning', true),
('Aaj raat, aaram karein. Aapne aaj paryapt kiya.', 'hi', 'Anika', 'evening', true),
('Jo aap niyantrit nahin kar sake use chhod dein. Kal ek aur mauka hai.', 'hi', 'Fatima', 'evening', true),
('Aapne ab tak har mushkil din paar kiya hai. Yeh bhi ho gaya.', 'hi', 'Carlos', 'evening', true),
('Cada manana es un nuevo comienzo. Elige como quieres aparecer hoy.', 'es', 'Maya', 'morning', true),
('El sol sale sin dudar. Tu tambien puedes.', 'es', 'Carlos', 'morning', true),
('Tu unica competencia hoy es quien eras ayer.', 'es', 'Sofia', 'morning', true),
('Esta noche, descansa. Hiciste suficiente hoy.', 'es', 'Elena', 'evening', true),
('Suelta lo que no pudiste controlar. Manana es otra oportunidad.', 'es', 'Isabel', 'evening', true),
('Chaque matin est un nouveau depart. Choisissez comment vous voulez vous presenter.', 'fr', 'Marie', 'morning', true),
('Le soleil se leve sans hesiter. Vous pouvez aussi.', 'fr', 'Pierre', 'morning', true),
('Ce soir, reposez-vous. Vous en avez fait assez.', 'fr', 'Sophie', 'evening', true),
('Jeder Morgen ist ein Neuanfang. Entscheide, wie du heute auftreten willst.', 'de', 'Lena', 'morning', true),
('Die Sonne geht ohne Zoegern auf. Du kannst es auch.', 'de', 'Max', 'morning', true),
('Heut Nacht, ruh dich aus. Du hast heute genug getan.', 'de', 'Anna', 'evening', true),
('Kull sabah bidaya jadida. Ikhtir kayfa turid an tazhara alyawm.', 'ar', 'Ahmed', 'morning', true),
('Allaylata, istarih. Laqad faalt ma yakfi alyawm.', 'ar', 'Sara', 'evening', true),
('Cada manha e um novo comeco. Escolha como voce quer se apresentar hoje.', 'pt', 'Ana', 'morning', true),
('Esta noite, descanse. Voce fez o suficiente hoje.', 'pt', 'Maria', 'evening', true),
('Mainichi no asa wa atarashii sutaato desu.', 'ja', 'Akiko', 'morning', true),
('Konya wa yasunde kudasai. Kyo wa jubun yaraimashita.', 'ja', 'Hanako', 'evening', true),
('Maeil achim eun saeroun sijakimnida.', 'ko', 'Jimin', 'morning', true),
('Oneul bam eun swieseyo. Oneul chungbunhi haessumnida.', 'ko', 'Minjun', 'evening', true),
('Mei ge zaochen dou shi xin de kaishi.', 'zh', 'Xiao Ming', 'morning', true),
('Jintian wanshang, xiuxi ba. Ni jintian yijing zuo de gou duo le.', 'zh', 'Xiao Li', 'evening', true);

-- SEED: English Affirmations (24 hours)
INSERT INTO affirmations (content, language, hour_slot) VALUES
('I am at peace with where I am in my journey.', 'en', 0),
('My rest is sacred and restores my strength.', 'en', 1),
('The universe is working in my favor.', 'en', 2),
('I trust the timing of my life completely.', 'en', 3),
('I wake up with energy, clarity, and purpose.', 'en', 4),
('Today holds opportunities I have not even imagined yet.', 'en', 5),
('I am grateful for the breath in my lungs and the strength in my body.', 'en', 6),
('My morning sets the tone for a beautiful day.', 'en', 7),
('I am enough, just as I am, right now.', 'en', 8),
('My goals are worthy and I am fully capable of achieving them.', 'en', 9),
('I attract positive energy and abundance into my life.', 'en', 10),
('I am focused, productive, and making meaningful progress.', 'en', 11),
('The middle of the day is full of possibility and potential.', 'en', 12),
('I am proud of how far I have come.', 'en', 13),
('Every challenge I face is making me stronger and wiser.', 'en', 14),
('I choose joy, even when things feel hard.', 'en', 15),
('My afternoon is filled with creativity and momentum.', 'en', 16),
('I am becoming the best version of myself every single day.', 'en', 17),
('I release what I cannot control and embrace what I can.', 'en', 18),
('I am deserving of love, rest, and all good things.', 'en', 19),
('As this day winds down, I honor everything I accomplished.', 'en', 20),
('I am healing, growing, and moving forward.', 'en', 21),
('Tonight I rest fully, knowing tomorrow brings new possibilities.', 'en', 22),
('I am grateful for this day and all it taught me.', 'en', 23);

-- Hindi Affirmations
INSERT INTO affirmations (content, language, hour_slot) VALUES
('Main apni yatra mein jahan hun, usse shanti mein hun.', 'hi', 0),
('Mera aaram pavitra hai aur meri shakti ko punarsthaapit karta hai.', 'hi', 1),
('Brahmand mere paksh mein kaam kar raha hai.', 'hi', 2),
('Mujhe apne jeevan ke samay par poora bharosa hai.', 'hi', 3),
('Main oorja, spashtta aur uddeshya ke saath uthta hun.', 'hi', 4),
('Aaj aise avsar hain jinki maine kalpana nahin ki.', 'hi', 5),
('Main apni sanson aur shareer ki shakti ke liye aabhari hun.', 'hi', 6),
('Meri subah aaj ke ek sundar din ki shuruaat karti hai.', 'hi', 7),
('Main paryapt hun, bilkul waise jaisa main abhi hun.', 'hi', 8),
('Mere lakshya mulyavan hain aur main unhe prapt karne mein saksham hun.', 'hi', 9),
('Main apne jeevan mein sakaratmak oorja aur samriddhi aakarshit karta hun.', 'hi', 10),
('Main kendrit, utpaadak aur sarthak pragati kar raha hun.', 'hi', 11),
('Dopahar sambhavana aur kshamata se bhari hai.', 'hi', 12),
('Mujhe garv hai ki main kitni door aa gaya hun.', 'hi', 13),
('Har chunauti mujhe mazboot aur buddhiman bana rahi hai.', 'hi', 14),
('Main khushi chunata hun, chahe cheezein kathin lagein.', 'hi', 15),
('Meri dopahar rachnatmakta aur gati se bhari hai.', 'hi', 16),
('Main har ek din apna sarvashreshtha sansakaran ban raha hun.', 'hi', 17),
('Main jo niyantrit nahin kar sakta use chodta hun.', 'hi', 18),
('Main pyaar, aaram aur sabhi acchi cheezon ka hakdaar hun.', 'hi', 19),
('Jaise yeh din samapt hota hai, main apni har uplabdhi ka samman karta hun.', 'hi', 20),
('Main theek ho raha hun, badh raha hun aur aage badh raha hun.', 'hi', 21),
('Aaj raat main poori tarah aaram karta hun.', 'hi', 22),
('Main is din ke liye aur isne jo sikhaya uske liye aabhari hun.', 'hi', 23);

-- Spanish Affirmations
INSERT INTO affirmations (content, language, hour_slot) VALUES
('Estoy en paz con donde estoy en mi viaje.', 'es', 0),
('Mi descanso es sagrado y restaura mi fuerza.', 'es', 1),
('El universo esta trabajando a mi favor.', 'es', 2),
('Confio completamente en el momento oportuno de mi vida.', 'es', 3),
('Me despierto con energia, claridad y proposito.', 'es', 4),
('Hoy hay oportunidades que aun ni he imaginado.', 'es', 5),
('Soy agradecido por el aliento en mis pulmones.', 'es', 6),
('Mi manana establece el tono para un dia hermoso.', 'es', 7),
('Soy suficiente, exactamente como soy, ahora mismo.', 'es', 8),
('Mis metas son valiosas y soy capaz de alcanzarlas.', 'es', 9),
('Atraigo energia positiva y abundancia a mi vida.', 'es', 10),
('Estoy enfocado, productivo y avanzando significativamente.', 'es', 11),
('El mediodia esta lleno de posibilidades y potencial.', 'es', 12),
('Estoy orgulloso de lo lejos que he llegado.', 'es', 13),
('Cada desafio me hace mas fuerte y sabio.', 'es', 14),
('Elijo la alegria, incluso cuando las cosas se sienten dificiles.', 'es', 15),
('Me estoy convirtiendo en la mejor version de mi mismo cada dia.', 'es', 16),
('Libero lo que no puedo controlar y acepto lo que puedo.', 'es', 17),
('Merezco amor, descanso y todas las cosas buenas.', 'es', 18),
('Al concluir este dia, honro todo lo que logre.', 'es', 19),
('Estoy sanando, creciendo y avanzando.', 'es', 20),
('Esta noche descanso completamente.', 'es', 21),
('Soy agradecido por este dia y todo lo que me enseno.', 'es', 22),
('Tengo la fuerza para superar cualquier obstaculo.', 'es', 23);
