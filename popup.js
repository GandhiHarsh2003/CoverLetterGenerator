document.getElementById("generateButton").addEventListener("click", async () => {
  const name = document.getElementById("nameInput").value;
  const experience = document.getElementById("experienceInput").value;

  if (!name || !experience) {
    console.log("Please enter both the name and experience!");
    return;
  }

  try {
    const response = await generateCoverLetter(name, experience);
    const content = response.choices[0].message.content;
    console.log(content)
    await generateAndDownloadPDF(content)
  } catch (error) {
    console.error("Error making API call:", error.message);
  }
});

async function generateAndDownloadPDF(content) {
  const newWindow = window.open("", "", "width=600,height=600");
  newWindow.document.write(`<pre>${content}</pre>`);
  newWindow.document.close();

  await new Promise((resolve) => {
    newWindow.onload = resolve;
  });

  newWindow.print();

  setTimeout(() => {
    newWindow.close();
  }, 100);
}

async function generateCoverLetter(name, experience) {
  console.log(name);
  console.log(experience);

  const jobDescription = "FireMon\n\nFireMon pioneered improving security outcomes by improving security operations in the cybersecurity industry. Technologies have changed, the threats have evolved, but our mission remains the same. Our culture is built upon four employee-driven values that focus on problem-solving, work/life balance, motivation, and innovation. These values are core to everything we do and fuel the impact our employees have on our customers, product, and overall organization. Each person is empowered to have a voice and is encouraged to collaborate, be creative, provide valuable insights, and play a role in the company's success.\n\nWe are looking for a Full Stack Software Engineer who has a passion for building exceptional solutions that deliver and fulfill the needs of our customers. As a Full Stack Software Engineer, you will collaborate with Product Management, other Engineers to design, build and deliver firewall management solutions which make complex firewall security operations simple. You will collaborate closely with technical and non-technical counterparts to understand our customers' problems and build products that deliver on the outcomes they deserve.\n\nThroughout the product lifecycle, you will be involved from idea generation, design, and prototyping to execution and implementation. Our organization is made up of small teams to support agility and creativity. That said, we encourage movement among teams to share context, skills, and experience, so you will learn about many distinct aspects of each product.\n\nAbout the role\n• Continuously provide customer value through the delivery of software features.\n• Write maintainable code, working in a professional agile software engineering environment (source control, shortened release cycles, continuous integration/deployment, etc.)\n• Participate in code reviews and team meetings, sharing technical insight.\n• Work with a team implementing new features and supporting current services/applications.\n• Work on hard problems; design, develop, test, deploy, maintain, and improve services and applications.\n• Learn new systems and tools as the FireMon platform and ecosystem evolve.\n• Utilize a broad application of principles, theories, and concepts in applicable disciplines, plus a working knowledge of other related fields.\n• Exercises judgment within generally defined practices and policies in selecting methods and techniques for obtaining solutions.\n\nSkills and Qualifications\n• Must Have\n• Humility\n• Integrity\n• A great desire to learn and collaborate with others\n• Experience with various programming languages, frameworks, and databases\n• Ability to write clean, effective code and pick up new things quickly\n• Resourceful, Analytical, and Agile\n• Enjoys opportunities to learn new skills\n• Effective communicator\n• Creativity and deep technical knowledge to convert what you know and what you learn into a better software product\n• Interest in network security/network security policy management\n• Should Have\n• Demonstrable problem-solving skills\n• College education, boot camp certification, or be self-taught\n• Desire to deliver impactful solutions\n• Applicable knowledge of agile development practices and principles\n• Hands-on experience with the following:\n• Languages and frameworks: Java 11 , Hibernate/JPA, Spring, Jackson, JavaScript, TypeScript, Angular\n• Databases: SQL, Postgres(or similar object-relational database systems)\n• Could Have\n• Experience with BDD (Binary Decision Diagram)\n• Networking and/or Security experience\n• Understands trade-offs of reliability, scalability, operational costs, and so on…\n• Experience with TDD (Test Driven Development), Pair Programming, Mob Programming\n• Hands-on experience with the following:\n• GIT\n• CI/CD pipelines (Jenkins, Travis)\n• Project Tracking Products (JIRA)\n\nAnti-patterns\n• Values individual success over team success\n• Easily distracted by new shiny things\n• Fails to collaborate, seek understanding\n• Condescending\n• Must be right\n• Fails to take ownership\n• Avoids responsibility\n• Prescriptive\n• Fails to provide thought leadership\n• Shows up for interview having done no research on FireMon our industry\n\nWhat it Takes to be Part of the FireMon Team\n\nFireMon provides persistent network security for hybrid environments through a powerful fusion of real-time asset visibility, continuous compliance, and automation. Since creating the first-ever network security policy management solution, FireMon has delivered command and control over complex network security infrastructures for more than 1,700 customers.\n\nOur customers have unique and complex security problems that are difficult to solve. This doesnt intimidate us, it inspires us. It pushes us to be more creative and find solutions to ensure their success"
  const details = "Create a tailored cover letter that highlights the most relevant skills and experiences from this job description and resume. It should not be more than 500 worlds"
  const prompt = details + ".Include my name. my name is " + name + "my experiences are " + experience + " Job description is " + jobDescription;


  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer api key",
    },
    body: JSON.stringify(requestBody),
  });

  return response.json();
}