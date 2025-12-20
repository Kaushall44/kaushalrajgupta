import React, { useState } from 'react';
import { Link, Globe, Loader2, Sparkles, Copy, Check, ArrowRight, ExternalLink, QrCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import Card from './ui/Card';
import { createShortLink } from '../lib/firebase';

const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState("");
    const [customCode, setCustomCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [showQr, setShowQr] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setResult("");
        setGeneratedLink("");
        setShowQr(false);

        if (!longUrl) {
            setError("Please enter a URL");
            return;
        }

        // Basic URL validation
        if (!longUrl.startsWith('http')) {
            setError("URL must start with http:// or https://");
            return;
        }

        setIsLoading(true);
        try {
            const code = customCode.trim() || Math.random().toString(36).substring(2, 8);
            await createShortLink(code, longUrl);

            setGeneratedLink(`${window.location.protocol}//${window.location.host}/s/${code}`);
            setResult("Success! Your link is ready.");
            setCustomCode(""); // Reset code
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
            <div className="text-center space-y-4">
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl mb-2 backdrop-blur-sm border border-blue-100 dark:border-blue-900/30">
                    <Link className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white">
                    Custom URL Shortener
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Create professional, trackable short links with your own custom alias.
                </p>
            </div>

            <Card className="p-8 md:p-10 border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-blue-900/5 dark:shadow-none bg-white dark:bg-[#111111] relative overflow-hidden group">


                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 ml-1">Original URL</label>
                        <div className="relative group/input">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within/input:text-blue-500 text-neutral-400">
                                <Globe className="h-5 w-5" />
                            </div>
                            <input
                                type="url"
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                placeholder="https://example.com/very-long-url"
                                className="block w-full pl-12 pr-4 py-4 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-gray-50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 ml-1">
                            Custom Alias <span className="text-neutral-400 font-normal ml-1">(Optional)</span>
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-4 bg-gray-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-500 font-mono text-sm select-none shadow-sm">
                                /s/
                            </div>
                            <input
                                type="text"
                                value={customCode}
                                onChange={(e) => setCustomCode(e.target.value)}
                                placeholder="my-link"
                                className="block w-full px-4 py-4 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-gray-50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-3 animate-fade-in">
                            <div className="p-1 bg-red-100 dark:bg-red-900/40 rounded-full shrink-0">
                                <ArrowRight className="w-3 h-3" />
                            </div>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/20 active:translate-y-[0px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Shorten URL <Sparkles className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {generatedLink && (
                    <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800/50 animate-fade-in-up">
                        <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <Sparkles className="w-24 h-24 text-green-500" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-green-800 dark:text-green-400 font-semibold mb-4 flex items-center gap-2">
                                    <div className="p-1 bg-green-200 dark:bg-green-900/50 rounded-full">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    Link Created Successfully!
                                </h3>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1 bg-white dark:bg-black/20 border border-green-200 dark:border-green-900/30 rounded-xl p-3 px-4 font-mono text-sm text-neutral-600 dark:text-neutral-300 truncate flex items-center">
                                        {generatedLink}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowQr(!showQr)}
                                            className={`px-4 py-3 border font-medium rounded-xl transition-colors flex items-center justify-center gap-2 ${showQr ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-black' : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'}`}
                                            title="View QR Code"
                                        >
                                            <QrCode className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex-1 sm:flex-none px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-green-600/20"
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            <span className="sm:hidden">{copied ? 'Copied' : 'Copy'}</span>
                                        </button>
                                        <a
                                            href={generatedLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl transition-colors flex items-center justify-center"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>

                                {showQr && (
                                    <div className="mt-6 flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-neutral-200 animate-fade-in">
                                        <QRCodeCanvas
                                            value={generatedLink}
                                            size={200}
                                            level={"H"}
                                            includeMargin={true}
                                            imageSettings={{
                                                src: "",
                                                x: undefined,
                                                y: undefined,
                                                height: 24,
                                                width: 24,
                                                excavate: true,
                                            }}
                                        />
                                        <p className="mt-4 text-sm text-neutral-500 font-medium">Scan to visit link</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default UrlShortener;
