import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Home, Award } from 'lucide-react';

const ExamSuccess = () => {
    const { exam_id, student_id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                {/* Success Icon */}
                <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle size={64} className="text-green-600" />
                </div>

                {/* Success Message */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Баярлалаа!
                </h1>
                <p className="text-xl text-green-600 font-semibold mb-4">
                    ✓ Шалгалт амжилттай илгээгдлээ
                </p>
                <p className="text-gray-600 mb-8">
                    Таны хариултууд хадгалагдсан. Багш үнэлгээ өгсний дараа үр дүнг харах боломжтой болно.
                </p>

                {/* Award Icon */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-8">
                    <Award size={32} className="mx-auto text-yellow-600 mb-2" />
                    <p className="text-sm text-yellow-800 font-medium">
                        Таны хичээл шаардлага өндөр байна!
                    </p>
                    
                </div>
                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/team6')}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Home size={20} />
                        Нүүр хуудас руу буцах
                    </button>

                    <Link
                        to={`/team6/exams/${exam_id}/students/${student_id}/result`}
                        className="block w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium transition-all"
                    >
                        Үр дүн харах
                    </Link>
                </div>

                {/* Additional Info */}
                <p className="text-xs text-gray-500 mt-6">
                    Асуулт эсвэл санал байвал багштайгаа холбогдоно уу.
                </p>
            </div>
        </div>
    );
};

export default ExamSuccess;
