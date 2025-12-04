import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://todu.mn/bs/lms/open-api-catalog/v1/"; // ★★★ API root

const ExamTake = () => {
  const { exam_id, student_id, attempt } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const token = localStorage.getItem("access_token");

  // ----------------------------
  // 1) LOAD EXAM QUESTIONS
  // ----------------------------
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await fetch(`${API}exams/${exam_id}/questions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        setQuestions(data.questions);
        setTimeRemaining(data.duration * 60);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    loadQuestions();
  }, []);

  // ----------------------------
  // 2) AUTO TIMER
  // ----------------------------
  useEffect(() => {
    if (!timeRemaining) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2,"0")}`;
  };

  // ----------------------------
  // 3) CHANGE ANSWER
  // ----------------------------
  const handleAnswerChange = (qid, value) => {
    setAnswers(prev => ({
      ...prev,
      [qid]: value
    }));
  };

  // ----------------------------
  // 4) SUBMIT TO BACKEND
  // ----------------------------
  const handleSubmit = async () => {
    const payload = {
      submit_time: new Date().toISOString(),
      answers: Object.entries(answers).map(([qid, value]) => ({
        question_id: Number(qid),
        answer: value
      }))
    };

    try {
      await fetch(`${API}exams/${exam_id}/users/${student_id}/attempts/${attempt}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      navigate(`/team6/exams/${exam_id}/students/${student_id}/attempt/${attempt}/result`);
    } catch (e) {
      console.error(e);
      alert("Илгээхэд алдаа гарлаа!");
    }
  };

  if (loading) return <p className="p-4">Түр хүлээнэ үү...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">

      <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
        <h2 className="font-semibold">Шалгалт</h2>
        <div className="font-mono">{formatTime(timeRemaining)}</div>
      </div>

      {questions.map((q, index) => (
        <div key={q.id} className="bg-white p-5 shadow rounded-lg">
          <h3 className="font-semibold mb-2">
            {index + 1}. {q.text}
          </h3>

          {q.type === "single_choice" &&
            q.options.map(opt => (
              <label key={opt.id} className="block mb-2">
                <input
                  type="radio"
                  name={`q${q.id}`}
                  checked={answers[q.id] === opt.id}
                  onChange={() => handleAnswerChange(q.id, opt.id)}
                />
                <span className="ml-2">{opt.text}</span>
              </label>
            ))
          }

          {q.type === "multiple_choice" &&
            q.options.map(opt => (
              <label key={opt.id} className="block mb-2">
                <input
                  type="checkbox"
                  checked={answers[q.id]?.includes(opt.id) || false}
                  onChange={e => {
                    const arr = answers[q.id] || [];
                    const newArr = e.target.checked
                      ? [...arr, opt.id]
                      : arr.filter(x => x !== opt.id);
                    handleAnswerChange(q.id, newArr);
                  }}
                />
                <span className="ml-2">{opt.text}</span>
              </label>
            ))
          }

          {q.type === "text_answer" && (
            <textarea
              className="w-full border p-2"
              rows={5}
              value={answers[q.id] || ""}
              onChange={e => handleAnswerChange(q.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
      >
        Илгээх
      </button>

    </div>
  );
};

export default ExamTake;
