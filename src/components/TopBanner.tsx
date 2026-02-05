import { Truck, CheckCircle, Receipt } from 'lucide-react';

export default function TopBanner() {
    return (
        <div className="w-full bg-gradient-to-r from-[#1E2B1E] via-[#4ADE80] to-[#1E2B1E] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

                    {/* Main Promotion Text */}
                    <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 text-sm font-medium opacity-90">
                        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold border border-green-500/30 whitespace-nowrap">
                            Free Shipping Global
                        </span>
                        <span>
                            <strong className="text-white">"올리브영에서 사고 배송비는 0원!"</strong>
                            <span className="mx-2 hidden sm:inline text-white/40">|</span>
                            <span className="text-gray-300">직접 매입으로 단가를 낮췄습니다.</span>
                        </span>
                    </div>

                    {/* Secondary Info / Trust Badges */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 hidden xl:flex">
                        <div className="flex items-center gap-1.5">
                            <Truck size={14} className="text-green-400" />
                            <span>배송비 0원</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle size={14} className="text-green-400" />
                            <span>100% 정품 보장</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Receipt size={14} className="text-green-400" />
                            <span>영수증 증빙 가능</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile-only scrolling ticker for long text if needed, or just static for now as requested "fit in whitespace" */}
            <div className="block md:hidden bg-black/20 px-4 py-2 text-xs text-center text-gray-300 border-t border-white/5">
                올리브영 정품을 매장 가격 그대로, 배송비 부담 없이 만나보세요.
            </div>
        </div>
    );
}
