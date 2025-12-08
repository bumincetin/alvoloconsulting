"use client";

import Image from 'next/image';
import { FaCheck, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';

const getAboutSectionContent = (lang: string) => {
  const content = {
    tr: {
      title: "Hakkımızda",
      paragraph1: "Alvolo Danışmanlık olarak, İtalya'da eğitim almak veya yeni bir yaşama başlamak isteyen bireylere kapsamlı danışmanlık hizmetleri sunuyoruz.",
      paragraph2: "Uzman ekibimiz, karmaşık bürokratik süreçlerde size rehberlik ederken, hayallerinize ulaşmanız için gerekli tüm adımları atmanıza yardımcı olur.",
      paragraph3: "Müşteri memnuniyetini ön planda tutarak, kişiye özel çözümlerle İtalya maceranızı kolaylaştırıyoruz.",
      valuesTitle: "Değerlerimiz",
      value1: "Şeffaflık ve Dürüstlük",
      value2: "Uzmanlık ve Profesyonellik",
      value3: "Kişiye Özel Yaklaşım",
      value4: "Güvenilirlik",
      value5: "Sürekli Destek",
      successRateStat: "Başarı Oranı",
      happyClientsStat: "Mutlu Danışan",
      teamTitle: "Ekibimizle Tanışın",
      team: [
        { name: "Bumin Kağan Çetin", title: "Kurucu Ortak", image: "/bumin.jpg", linkedin: "https://www.linkedin.com/in/buminkcetin/" },
        { name: "Oğuzhan Aslan", title: "Kurucu Ortak", image: "/ozi.jpg", linkedin: "https://www.linkedin.com/in/oguzhan--aslan/" },
        { name: "Ece Melisa Özgüner", title: "Kurucu Ortak", image: "/melisa.jpeg", linkedin: "https://www.linkedin.com/in/ecemelisaozguner/" },
      ]
    },
    en: {
      title: "About Us",
      paragraph1: "As Alvolo Consulting, we offer comprehensive consulting services to individuals who want to study or start a new life in Italy.",
      paragraph2: "Our expert team guides you through complex bureaucratic processes and helps you take all necessary steps to achieve your dreams.",
      paragraph3: "Prioritizing customer satisfaction, we facilitate your Italian adventure with personalized solutions.",
      valuesTitle: "Our Values",
      value1: "Transparency and Honesty",
      value2: "Expertise and Professionalism",
      value3: "Personalized Approach",
      value4: "Reliability",
      value5: "Continuous Support",
      successRateStat: "Success Rate",
      happyClientsStat: "Happy Clients",
      teamTitle: "Meet Our Team",
      team: [
        { name: "Bumin Kağan Çetin", title: "Co-founder", image: "/bumin.jpg", linkedin: "https://www.linkedin.com/in/buminkcetin/" },
        { name: "Oğuzhan Aslan", title: "Co-founder", image: "/ozi.jpg", linkedin: "https://www.linkedin.com/in/oguzhan--aslan/" },
        { name: "Ece Melisa Özgüner", title: "Co-founder", image: "/melisa.jpeg", linkedin: "https://www.linkedin.com/in/ecemelisaozguner/" },
      ]
    },
    it: {
      title: "Chi Siamo",
      paragraph1: "Come Alvolo Consulenza, offriamo servizi di consulenza completi a persone che desiderano studiare o iniziare una nuova vita in Italia.",
      paragraph2: "Il nostro team esperto ti guida attraverso complessi processi burocratici e ti aiuta a compiere tutti i passi necessari per realizzare i tuoi sogni.",
      paragraph3: "Dando priorità alla soddisfazione del cliente, facilitiamo la tua avventura italiana con soluzioni personalizzate.",
      valuesTitle: "I Nostri Valori",
      value1: "Trasparenza e Onestà",
      value2: "Competenza e Professionalità",
      value3: "Approccio Personalizzato",
      value4: "Affidabilità",
      value5: "Supporto Continuo",
      successRateStat: "Tasso di Successo",
      happyClientsStat: "Clienti Soddisfatti",
      teamTitle: "Incontra il Nostro Team",
      team: [
        { name: "Bumin Kağan Çetin", title: "Co-fondatore", image: "/bumin.jpg", linkedin: "https://www.linkedin.com/in/buminkcetin/" },
        { name: "Oğuzhan Aslan", title: "Co-fondatore", image: "/ozi.jpg", linkedin: "https://www.linkedin.com/in/oguzhan--aslan/" },
        { name: "Ece Melisa Özgüner", title: "Co-fondatore", image: "/melisa.jpeg", linkedin: "https://www.linkedin.com/in/ecemelisaozguner/" },
      ]
    }
  };
  return content[lang as keyof typeof content] || content.tr;
};

const AboutPage = () => {
  const { language } = useLanguage();
  const c = getAboutSectionContent(language);

  const valuesList = [c.value1, c.value2, c.value3, c.value4, c.value5];
  const teamImageAlt = language === 'tr' ? "Ekip Fotoğrafı" : (language === 'en' ? "Team Photo" : "Foto del Team");

  return (
    <>
      <Navbar />
      <section id="about-main" className="py-20 pt-32" style={{backgroundColor: 'var(--bg-primary)'}}>
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            <div className="lg:w-1/2">
              <div className="relative w-full h-[600px] transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/ozibumin.jpeg"
                  alt={teamImageAlt}
                  fill
                  className="object-cover rounded-xl shadow-xl"
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="inline-block">
                <h2 className="text-4xl font-bold mb-2" style={{color: 'var(--brand-blue)'}}>
                  {c.title}
                </h2>
                <div className="h-1 w-1/3 rounded-full mb-6" style={{backgroundColor: 'var(--brand-orange)'}}></div>
              </div>
              <p className="text-lg mb-8" style={{color: 'var(--text-primary)'}}>
                {c.paragraph1}
                <span className="block mt-4 font-semibold" style={{color: 'var(--brand-blue)'}}>
                  {c.paragraph2}
                </span>
                <span className="block mt-4" style={{color: 'var(--text-secondary)'}}>
                  {c.paragraph3}
                </span>
              </p>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4" style={{color: 'var(--brand-blue)'}}>
                  {c.valuesTitle}
                </h3>
                <ul className="space-y-3">
                  {valuesList.map((value, index) => (
                    value && (
                      <li key={index} className="flex items-center gap-3 group">
                        <FaCheck className="flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300" style={{color: 'var(--brand-orange)'}} />
                        <span className="group-hover:transition-colors duration-300" style={{color: 'var(--text-secondary)'}}>{value}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="p-6 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" style={{backgroundColor: 'var(--bg-surface)'}}>
                  <div className="text-3xl font-bold mb-2" style={{color: 'var(--brand-orange)'}}>95%</div>
                  <div style={{color: 'var(--text-secondary)'}}>{c.successRateStat}</div>
                </div>
                <div className="p-6 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" style={{backgroundColor: 'var(--bg-surface)'}}>
                  <div className="text-3xl font-bold mb-2" style={{color: 'var(--brand-orange)'}}>1000+</div>
                  <div style={{color: 'var(--text-secondary)'}}>{c.happyClientsStat}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{color: 'var(--brand-blue)'}}>{c.teamTitle}</h2>
            <div className="h-1 w-24 rounded-full mx-auto mb-12" style={{backgroundColor: 'var(--brand-orange)'}}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {c.team.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" style={{backgroundColor: 'var(--bg-surface)'}}>
                <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border-4" style={{borderColor: 'var(--brand-orange)'}}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    quality={100}
                    sizes="160px"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-1" style={{color: 'var(--text-primary)'}}>{member.name}</h3>
                <p className="mb-3" style={{color: 'var(--brand-orange)'}}>{member.title}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{color: 'var(--brand-blue)'}}
                  onMouseOver={e => e.currentTarget.style.color = 'var(--brand-orange)'}
                  onMouseOut={e => e.currentTarget.style.color = 'var(--brand-blue)'}
                  aria-label={`${member.name} LinkedIn Profili`}
                >
                  <FaLinkedin size={28} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage; 