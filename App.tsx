
import React, { useState, useEffect } from 'react';
import { PageBlock, PageData, BlockType } from './types';

const ADMIN_CODE = "dtdt102";

const App: React.FC = () => {
  const [screen, setScreen] = useState<'intro' | 'whitePage'>('intro');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  
  // Dữ liệu mặc định được cập nhật theo yêu cầu của bạn
  const [pageData, setPageData] = useState<PageData>({
    "blocks": [
      {
        "id": "1767560685980",
        "type": "image",
        "content": "https://i.ibb.co/LdSBjNn0/Banner-Ch-m-4.png",
        "styles": {
          "width": "100%",
          "borderRadius": "24px",
          "marginTop": "20px",
          "textAlign": "center",
          "backgroundColor": "transparent"
        }
      },
      {
        "id": "1",
        "type": "text",
        "content": "CHẠM – 15 NĂM MỘT HÀNH TRÌNH NHÂN ÁI\n\nThân gửi Quý anh/chị và các bạn thân mến,\n\nMười lăm năm – một chặng đường không quá dài, nhưng đủ để Hiến Máu Nhân Đạo chạm đến hàng ngàn nhịp tim, kết nối những tấm lòng nhân ái và lan tỏa giá trị của sự sẻ chia không điều kiện.\n\n“Chạm” là khoảnh khắc bàn tay trao đi giọt máu hồng,\nlà khi một nghĩa cử nhỏ bé trở thành hy vọng lớn lao cho sự sống,\nvà là hành trình mà chúng tôi may mắn có được sự đồng hành của anh/chị và các bạn.\n\nNhân dịp sinh nhật 15 năm thành lập CLB Hiến Máu Nhân Đạo, chúng tôi xin gửi lời tri ân chân thành đến tất cả những tấm lòng đã, đang và sẽ tiếp tục đồng hành cùng CLB trên con đường nhân ái này.\n\nChúng tôi trân trọng kính mời anh/chị và các bạn đến tham dự sự kiện:\n\n⏰ Thời gian: ………………………\n📍 Địa điểm: ………………………\n\nSự hiện diện của anh/chị và các bạn không chỉ là niềm vinh hạnh, mà còn là nguồn động viên to lớn để hành trình nhân ái ấy tiếp tục được viết nên bằng những lần “chạm” đầy yêu thương trong tương lai.\n\nRất mong được gặp lại anh/chị và các bạn trong buổi gặp gỡ ý nghĩa này.\n\nTrân trọng,\nCLB Hiến Máu Nhân Đạo, Trường ĐH Luật - ĐH Huế.",
        "styles": {
          "fontSize": "18px",
          "fontWeight": "normal",
          "textAlign": "left",
          "color": "#720b0d",
          "marginTop": "40px",
          "fontFamily": "Inter",
          "backgroundColor": "#ffffff",
          "hasDashedBorder": true,
          "borderColor": "#720b0d"
        }
      }
    ],
    "bgMusicUrl": "https://www.youtube.com/watch?v=FhtRLaACkMA"
  });

  // Tải dữ liệu từ LocalStorage khi mở trang (để ưu tiên những gì người dùng đã sửa cục bộ)
  useEffect(() => {
    const saved = localStorage.getItem('nhamau_page_data_final_v5');
    if (saved) setPageData(JSON.parse(saved));
  }, []);

  // Tự động lưu vào trình duyệt khi có thay đổi
  useEffect(() => {
    localStorage.setItem('nhamau_page_data_final_v5', JSON.stringify(pageData));
  }, [pageData]);

  // Logic tạo sao rơi
  const [stars, setStars] = useState<{ id: number; left: string; duration: string; size: string; delay: string }[]>([]);
  useEffect(() => {
    const newStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 5 + 4}s`,
      size: `${Math.random() * 10 + 10}px`,
      delay: `${Math.random() * 8}s`
    }));
    setStars(newStars);
  }, [screen]);

  const handleAdminLogin = () => {
    if (adminInput === ADMIN_CODE) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminInput("");
    } else {
      alert("Mã truy cập không đúng!");
    }
  };

  const addBlock = (type: BlockType, index?: number) => {
    const newBlock: PageBlock = type === 'text' 
      ? { 
          id: Date.now().toString(), 
          type: 'text', 
          content: 'Nhập nội dung mới...', 
          styles: { textAlign: 'center', fontSize: '18px', color: '#000000', lineHeight: '1.6', backgroundColor: '#ffffff', borderRadius: '12px' } 
        }
      : { 
          id: Date.now().toString(), 
          type: 'image', 
          content: 'https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-1262.jpg', 
          styles: { width: '100%', borderRadius: '24px', marginTop: '20px', textAlign: 'center', backgroundColor: 'transparent' } 
        };
    
    setPageData(prev => {
      const newBlocks = [...prev.blocks];
      if (typeof index === 'number') {
        newBlocks.splice(index + 1, 0, newBlock);
      } else {
        newBlocks.push(newBlock);
      }
      return { ...prev, blocks: newBlocks };
    });
  };

  const updateBlock = (id: string, updates: Partial<PageBlock>) => {
    setPageData(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === id ? { ...b, ...updates } : b)
    }));
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(pageData));
    alert("Đã sao chép mã cấu hình! Hãy gửi mã này cho AI nếu bạn muốn thay đổi mã nguồn mặc định vĩnh viễn.");
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    setPageData(prev => {
      const newBlocks = [...prev.blocks];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newBlocks.length) return prev;
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      return { ...prev, blocks: newBlocks };
    });
  };

  const youtubeId = pageData.bgMusicUrl.includes('v=') 
    ? pageData.bgMusicUrl.split('v=')[1].split('&')[0] 
    : pageData.bgMusicUrl.split('/').pop();

  if (screen === 'intro') {
    return (
      <div className="fixed inset-0 z-[100] intro-bg flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <iframe width="0" height="0" src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}`} frameBorder="0" allow="autoplay"></iframe>
        <div className="fixed inset-0 pointer-events-none">
          {stars.map(star => (
            <div key={star.id} className="star-yellow" style={{ left: star.left, animationDuration: star.duration, animationDelay: star.delay }} />
          ))}
        </div>
        <div className="relative z-20 max-w-5xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-24 leading-[2.2] glow-text font-['Montserrat'] tracking-widest">
            BẠN ĐÃ SẴN SÀNG ĐI CÙNG NHÀ MÁU ĐẾN VỚI SỰ KIỆN SẮP TỚI CHƯA?
          </h1>
          <button onClick={() => setScreen('whitePage')} className="bg-[#fcd130] hover:bg-[#ffe066] text-black font-black text-xl md:text-3xl px-20 py-8 rounded-full shadow-[0_20px_60px_rgba(252,209,48,0.6)] transform transition-all hover:scale-110 duration-300 uppercase tracking-widest border-4 border-black/10">
            ĐÃ SẴN SÀNG
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#fdf7e3' }}>
      <iframe width="0" height="0" src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}`} frameBorder="0" allow="autoplay"></iframe>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
        {stars.map(star => (
          <div key={star.id} className="star-yellow" style={{ left: star.left, animationDuration: star.duration, animationDelay: star.delay }} />
        ))}
      </div>

      <div className="fixed top-4 right-4 z-[60] flex gap-2">
        {!isAdmin ? (
          <button onClick={() => setShowAdminLogin(true)} className="bg-black/5 hover:bg-black/10 text-black/40 text-[10px] px-4 py-2 rounded-full border border-black/5">⚙️ Admin</button>
        ) : (
          <div className="flex gap-2 bg-black text-white p-1 rounded-full shadow-2xl">
            <button onClick={copyConfig} className="bg-blue-600 text-white text-[10px] px-4 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors">💾 Sao chép mã</button>
            <button onClick={() => setIsAdmin(false)} className="bg-red-600 text-white text-[10px] px-4 py-2 rounded-full font-black uppercase hover:bg-red-700 transition-colors">Thoát chỉnh sửa</button>
          </div>
        )}
      </div>

      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center border border-zinc-100">
            <h3 className="text-2xl font-black mb-2 font-['Montserrat']">XÁC MINH</h3>
            <input type="password" autoFocus className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-6 py-4 mb-6 text-center text-xl font-bold focus:border-[#720b0d] outline-none" value={adminInput} onChange={(e) => setAdminInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()} placeholder="Mật mã..." />
            <div className="flex gap-4">
              <button onClick={() => setShowAdminLogin(false)} className="flex-1 py-4 text-zinc-400 font-bold">Hủy</button>
              <button onClick={handleAdminLogin} className="flex-1 py-4 bg-[#720b0d] text-white rounded-2xl font-black">VÀO</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-32 min-h-screen relative z-10">
        {pageData.blocks.map((block, index) => (
          <div 
            key={block.id} 
            className={`relative group/block mb-12 ${isAdmin ? 'hover:bg-black/5 rounded-2xl p-4 -mx-4' : ''}`}
            style={{
              border: block.styles.hasDashedBorder ? `3px dashed ${block.styles.borderColor || '#720b0d'}` : 'none',
              borderRadius: block.styles.borderRadius || '24px',
              backgroundColor: block.styles.backgroundColor || 'transparent',
              padding: block.styles.backgroundColor && block.styles.backgroundColor !== 'transparent' ? '24px' : '0px'
            }}
          >
            {isAdmin && (
              <div className="absolute -left-20 top-0 flex flex-col gap-2 p-2 bg-white border border-zinc-200 shadow-xl rounded-2xl z-40 animate-in slide-in-from-left-4">
                <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-2 hover:bg-zinc-100 rounded-xl disabled:opacity-20"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                <button onClick={() => moveBlock(index, 'down')} disabled={index === pageData.blocks.length - 1} className="p-2 hover:bg-zinc-100 rounded-xl disabled:opacity-20"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                <button onClick={() => {if(confirm("Xóa khối này?")) setPageData(prev => ({...prev, blocks: prev.blocks.filter(b => b.id !== block.id)}))}} className="p-2 hover:bg-red-50 rounded-xl text-red-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
              </div>
            )}

            {isAdmin && (
              <div className="absolute -right-24 top-0 flex flex-col gap-2 p-2 bg-white border border-zinc-200 shadow-xl rounded-2xl z-40 animate-in slide-in-from-right-4">
                {/* Formatting Tools (Bold, Italic, Underline) */}
                <button onClick={() => updateBlock(block.id, { styles: { ...block.styles, fontWeight: block.styles.fontWeight === 'bold' ? 'normal' : 'bold' } })} className={`p-2 rounded-xl text-sm font-bold ${block.styles.fontWeight === 'bold' ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'}`}>B</button>
                <button onClick={() => updateBlock(block.id, { styles: { ...block.styles, fontStyle: block.styles.fontStyle === 'italic' ? 'normal' : 'italic' } })} className={`p-2 rounded-xl text-sm italic ${block.styles.fontStyle === 'italic' ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'}`}>I</button>
                <button onClick={() => updateBlock(block.id, { styles: { ...block.styles, textDecoration: block.styles.textDecoration === 'underline' ? 'none' : 'underline' } })} className={`p-2 rounded-xl text-sm underline ${block.styles.textDecoration === 'underline' ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'}`}>U</button>
                
                <div className="h-[1px] bg-zinc-100 mx-2"></div>
                
                {/* Alignment Tools */}
                <button onClick={() => updateBlock(block.id, { styles: { ...block.styles, textAlign: 'left' } })} className={`p-2 rounded-xl ${block.styles.textAlign === 'left' ? 'bg-zinc-200' : 'hover:bg-zinc-100'}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                <button onClick={() => updateBlock(block.id, { styles: { ...block.styles, textAlign: 'center' } })} className={`p-2 rounded-xl ${block.styles.textAlign === 'center' ? 'bg-zinc-200' : 'hover:bg-zinc-100'}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                <button onClick={() => updateBlock(block.id, { styles: { ...block.styles, textAlign: 'right' } })} className={`p-2 rounded-xl ${block.styles.textAlign === 'right' ? 'bg-zinc-200' : 'hover:bg-zinc-100'}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M10 12h10M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                
                <div className="h-[1px] bg-zinc-100 mx-2"></div>
                
                {/* Border & Color Tools */}
                <button onClick={() => updateBlock(block.id, { styles: { ...block.styles, hasDashedBorder: !block.styles.hasDashedBorder } })} className={`p-2 rounded-xl text-xs font-black ${block.styles.hasDashedBorder ? 'bg-[#720b0d] text-white' : 'hover:bg-zinc-100'}`}>---</button>
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-[7px] font-bold">MÀU VIỀN</span>
                  <input type="color" value={block.styles.borderColor || "#720b0d"} onChange={(e) => updateBlock(block.id, { styles: { ...block.styles, borderColor: e.target.value } })} className="w-7 h-7 rounded-lg border-none cursor-pointer" />
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-[7px] font-bold">NỀN KHỐI</span>
                  <input type="color" value={block.styles.backgroundColor || "#ffffff"} onChange={(e) => updateBlock(block.id, { styles: { ...block.styles, backgroundColor: e.target.value } })} className="w-7 h-7 rounded-lg border-none cursor-pointer" />
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-[7px] font-bold">MÀU CHỮ</span>
                  <input type="color" value={block.styles.color || "#000000"} onChange={(e) => updateBlock(block.id, { styles: { ...block.styles, color: e.target.value } })} className="w-7 h-7 rounded-lg border-none cursor-pointer" />
                </div>
              </div>
            )}

            {block.type === 'text' ? (
              <div 
                contentEditable={isAdmin} suppressContentEditableWarning onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.innerText })}
                style={{ ...block.styles, fontFamily: block.styles.fontFamily || 'Inter', outline: (isAdmin && !block.styles.hasDashedBorder) ? '1px dashed #720b0d' : 'none' }}
                className={`w-full whitespace-pre-wrap leading-relaxed ${isAdmin ? 'cursor-text' : ''}`}
              >
                {block.content}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {isAdmin && (
                  <div className="w-full mb-4 flex gap-2">
                    <input className="flex-1 bg-white/50 border rounded-xl px-4 py-2 text-xs outline-none" value={block.content} onChange={(e) => updateBlock(block.id, { content: e.target.value })} placeholder="Dán link ảnh tại đây..." />
                    <a href="https://imgbb.com/" target="_blank" className="bg-[#720b0d] text-white text-[10px] px-4 py-2 rounded-xl font-bold flex items-center justify-center">Up Ảnh</a>
                  </div>
                )}
                <img src={block.content} style={{ width: block.styles.width || '100%', borderRadius: block.styles.borderRadius || '24px' }} className="shadow-2xl shadow-black/5" />
              </div>
            )}

            {isAdmin && block.type === 'text' && (
              <div className="flex gap-4 mt-4 px-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold uppercase opacity-50">Cỡ chữ</span>
                  <select className="text-xs bg-white/50 border rounded-lg p-2 outline-none" value={block.styles.fontSize} onChange={(e) => updateBlock(block.id, { styles: { ...block.styles, fontSize: e.target.value } })}>
                    <option value="14px">Nhỏ</option><option value="18px">Thường</option><option value="24px">Vừa</option><option value="32px">Lớn</option><option value="48px">Rất lớn</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold uppercase opacity-50">Font</span>
                  <select className="text-xs bg-white/50 border rounded-lg p-2 outline-none" value={block.styles.fontFamily} onChange={(e) => updateBlock(block.id, { styles: { ...block.styles, fontFamily: e.target.value } })}>
                    <option value="Inter">Mặc định</option><option value="Montserrat">Nổi bật</option><option value="Playfair Display">Cổ điển</option><option value="Roboto">Hiện đại</option>
                  </select>
                </div>
              </div>
            )}

            {isAdmin && (
              <div className="flex justify-center mt-8 group/add-mid">
                <button onClick={() => addBlock('text', index)} className="bg-white border text-zinc-300 text-[10px] px-6 py-2 rounded-full font-bold hover:bg-[#720b0d] hover:text-white transition-all opacity-0 group-hover/add-mid:opacity-100 shadow-xl">+ CHÈN GIỮA</button>
              </div>
            )}
          </div>
        ))}

        {isAdmin && (
          <div className="mt-20 flex flex-col items-center gap-6 border-2 border-dashed border-zinc-200 rounded-[3rem] p-20">
            <h3 className="text-xl font-black font-['Montserrat'] text-zinc-300 uppercase tracking-widest">THÊM KHỐI MỚI</h3>
            <div className="flex gap-4">
              <button onClick={() => addBlock('text')} className="bg-white border px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-[#720b0d] hover:text-white transition-all">Thêm Văn Bản</button>
              <button onClick={() => addBlock('image')} className="bg-white border px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-[#720b0d] hover:text-white transition-all">Thêm Hình Ảnh</button>
            </div>
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] bg-zinc-900 text-white border border-white/10 shadow-2xl rounded-full px-10 py-5 flex items-center gap-10 backdrop-blur-xl">
           <div className="flex flex-col gap-1">
             <span className="text-[10px] font-black text-[#fcd130] uppercase tracking-widest">NHẠC NỀN YOUTUBE</span>
             <input className="bg-white/10 px-4 py-2 rounded-xl text-xs outline-none w-64 border-none" value={pageData.bgMusicUrl} onChange={(e) => setPageData(prev => ({ ...prev, bgMusicUrl: e.target.value }))} placeholder="Dán link bài hát YouTube..." />
           </div>
        </div>
      )}
      
      {/* Fanpage Facebook */}
      <a href="https://www.facebook.com/hienmauluathue" target="_blank" rel="noopener noreferrer" className="fixed bottom-10 left-10 w-16 h-16 bg-[#1877F2] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-[60] border-4 border-white overflow-hidden">
        <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>

      {!isAdmin && (
        <button onClick={() => setScreen('intro')} className="fixed bottom-10 right-10 w-16 h-16 bg-[#720b0d] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-[60] border-4 border-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
    </div>
  );
};

export default App;
