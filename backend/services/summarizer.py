from groq import Groq
from services.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def summarize(text):

    text = text[:12000]

    prompt = f"""
    Summarize this research paper.

    Include:

    1. Research Objective
    2. Methodology
    3. Key Findings
    4. Limitations

    Paper:

    {text}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
    )

    return response.choices[0].message.content