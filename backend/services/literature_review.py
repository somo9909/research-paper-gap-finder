from groq import Groq
from services.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def generate_literature_review(summaries):

    prompt = f"""
    You are an academic researcher.

    Based on these paper summaries, write a literature review.

    Structure:

    1. Introduction
    2. Summary of Existing Research
    3. Common Findings
    4. Differences Between Studies
    5. Research Gaps
    6. Conclusion

    Paper Summaries:

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
        temperature=0.3
    )

    return response.choices[0].message.content