from groq import Groq
from services.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def find_research_gaps(summaries):

    prompt = f"""
    Analyze the following research paper summaries.

    Provide:

    1. Common Themes
    2. Contradictions
    3. Research Gaps
    4. Underexplored Areas
    5. Future Research Directions
    6. Potential Thesis / Project Ideas

    Summaries:

    {summaries}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.4
    )

    return response.choices[0].message.content