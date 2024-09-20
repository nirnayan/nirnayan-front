export interface FAQItem {
    title: string;
    description: string;
    id: string; // Unique identifier for the accordion item
  }
  
  export const FAQItems: FAQItem[] = [
    {
      id: 'collapseOne',
      title: 'How can I find information on tests and packages?',
      description: `You need to log in to <strong>www.nirnayanhealthcare.com</strong> and click on the option of “Patient” 
                     and you will get the information about that and also you can filter test and packages according to 
                     you.`
    },
    {
      id: 'collapseTwo',
      title: 'How can I find the employee benefits of Our Healthcare?',
      description: `You need to log in to <strong>www.nirnayanhealthcare.com</strong> and then click on the “Career” 
                     option and there you will get the information about it.`
    },
    {
      id: 'collapseThree',
      title: 'How can I get to know about your department\'s details?',
      description: `You just need to log in to our website www.nirnayanhealthcare.com and there you will get the option 
                     Laboratory click on it, and you will get the option Department. From there you will all the latest 
                     information about our departments.`
    },
    {
      id: 'collapseFour',
      title: 'What topics are covered on this healthcare blog?',
      description: `Our blog provides comprehensive coverage of various health-related topics, including wellness tips, 
                     disease prevention strategies, mental health support, nutrition advice, and updates on the latest 
                     medical research. We aim to offer valuable insights to help you make informed health decisions.`
    },
    {
      id: 'collapseFive',
      title: 'What is a Medical Encyclopedia?',
      description: `A Medical Encyclopedia is a comprehensive reference resource that provides detailed information on a 
                     wide range of medical topics, including diseases, conditions, treatments, and medical terminology. It 
                     serves as a valuable tool for understanding medical concepts and improving health literacy.`
    },
    {
      id: 'collapseSix',
      title: 'What is an Association?',
      description: `An association is a group or organization of individuals who come together based on shared interests, 
                     goals, or professions. Associations often focus on specific areas such as health, education, or 
                     industry to promote collaboration, provide resources, and advance common objectives.`
    }
  ];
  