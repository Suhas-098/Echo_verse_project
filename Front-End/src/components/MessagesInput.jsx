import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon, Calendar } from "lucide-react";

function MessagesInput() {
  const { playRandomKeyStorkeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(""); // State for scheduled date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to toggle date picker

  const fileInputRef = useRef(null);
  const { sendMessage, scheduleMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStorkeSound();

    if (scheduledDate) {
      // If a date is selected, schedule the message
      await scheduleMessage({
        text: text.trim(),
        image: imagePreview,
        scheduledAt: scheduledDate
      });
      setScheduledDate("");
      setShowDatePicker(false);
    } else {
      // Otherwise send immediately
      await sendMessage({
        text: text.trim(),
        image: imagePreview
      });
    }

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 border-t border-white/5 bg-surface/30 backdrop-blur-md">
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-white/10 shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500/20 transition-all"
              type="button"
            >
              <XIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              isSoundEnabled && playRandomKeyStorkeSound();
            }}
            className="w-full bg-surface/50 border border-white/5 rounded-xl py-3 pl-4 pr-24 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
            placeholder="Type your message..."
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Date Picker Toggle Button */}
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`p-1.5 rounded-lg transition-colors ${scheduledDate ? "text-primary bg-primary/10" : "text-slate-400 hover:text-primary hover:bg-white/5"
                }`}
              title="Schedule message"
            >
              <Calendar className="w-5 h-5" />
            </button>

            {/* Image Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`p-1.5 rounded-lg transition-colors ${imagePreview ? "text-primary bg-primary/10" : "text-slate-400 hover:text-primary hover:bg-white/5"
                }`}
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Date Picker Popup */}
          {showDatePicker && (
            <div className="absolute bottom-full right-0 mb-2 p-3 bg-surface border border-white/10 rounded-xl shadow-xl z-50 backdrop-blur-lg">
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="bg-surface/50 border border-white/5 rounded-lg p-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-3 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default MessagesInput;