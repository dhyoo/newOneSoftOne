import React, { useEffect, useRef, useState } from 'react';

interface KakaoMapProps {
    lat: number;
    lng: number;
    level?: number;
    companyName?: string;
    address?: string;
    apiKey?: string;
}

declare global {
    interface Window {
        kakao: any;
    }
}

export function KakaoMap({ lat, lng, level = 3, companyName = '소프트원', address = '우림블루나인 D동 901호', apiKey }: KakaoMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!mapContainer.current) return;

        let retryCount = 0;
        const maxRetries = 50; // 5초간 재시도 (100ms * 50)

        // 카카오맵 스크립트 동적 로드
        const loadKakaoScript = (): Promise<void> => {
            return new Promise((resolve, reject) => {
                // 이미 로드되어 있는지 확인
                if (window.kakao && window.kakao.maps) {
                    resolve();
                    return;
                }

                // 스크립트가 이미 추가되어 있는지 확인
                const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
                if (existingScript) {
                    // 스크립트가 있지만 아직 로드되지 않은 경우
                    const checkInterval = setInterval(() => {
                        if (window.kakao && window.kakao.maps) {
                            clearInterval(checkInterval);
                            resolve();
                        }
                        retryCount++;
                        if (retryCount > maxRetries) {
                            clearInterval(checkInterval);
                            reject(new Error('카카오맵 스크립트 로드 시간 초과'));
                        }
                    }, 100);
                    return;
                }

                // 스크립트 동적 추가 (API 키가 있는 경우)
                if (apiKey && apiKey !== 'YOUR_KAKAO_API_KEY') {
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services`;
                    script.async = true;
                    script.onload = () => {
                        if (window.kakao && window.kakao.maps) {
                            resolve();
                        } else {
                            reject(new Error('카카오맵 API를 초기화할 수 없습니다'));
                        }
                    };
                    script.onerror = () => {
                        reject(new Error('카카오맵 스크립트를 로드할 수 없습니다. API 키를 확인해주세요.'));
                    };
                    document.head.appendChild(script);
                } else {
                    // HTML에 이미 스크립트가 있는 경우 대기
                    const checkInterval = setInterval(() => {
                        if (window.kakao && window.kakao.maps) {
                            clearInterval(checkInterval);
                            resolve();
                        }
                        retryCount++;
                        if (retryCount > maxRetries) {
                            clearInterval(checkInterval);
                            reject(new Error('카카오맵 API 키가 설정되지 않았습니다. index.html에서 YOUR_KAKAO_API_KEY를 실제 API 키로 교체해주세요.'));
                        }
                    }, 100);
                }
            });
        };

        // 지도 초기화
        const initMap = () => {
            try {
                const kakao = window.kakao;
                const container = mapContainer.current;

                if (!container) return;

                // 지도 생성
                const options = {
                    center: new kakao.maps.LatLng(lat, lng),
                    level: level
                };

                const map = new kakao.maps.Map(container, options);
                mapInstance.current = map;

                // 마커 생성
                const markerPosition = new kakao.maps.LatLng(lat, lng);
                const marker = new kakao.maps.Marker({
                    position: markerPosition
                });
                marker.setMap(map);

                // 인포윈도우 생성
                const iwContent = `
                    <div style="padding:10px;font-size:14px;font-weight:bold;min-width:150px;">
                        <div style="margin-bottom:5px;">${companyName}</div>
                        <div style="font-size:12px;font-weight:normal;color:#666;">${address}</div>
                    </div>
                `;
                const infowindow = new kakao.maps.InfoWindow({
                    content: iwContent
                });
                infowindow.open(map, marker);

                setIsLoading(false);
                setError(null);
            } catch (err: any) {
                setError(err.message || '지도를 초기화하는 중 오류가 발생했습니다.');
                setIsLoading(false);
            }
        };

        // 스크립트 로드 후 지도 초기화
        loadKakaoScript()
            .then(() => {
                initMap();
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });

        // 컴포넌트 언마운트 시 정리
        return () => {
            if (mapInstance.current) {
                mapInstance.current = null;
            }
        };
    }, [lat, lng, level, companyName, address, apiKey]);

    return (
        <div
            ref={mapContainer}
            className="w-full h-full relative"
            style={{ minHeight: '400px' }}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-600">지도를 불러오는 중...</p>
                    </div>
                </div>
            )}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 p-4">
                    <div className="text-center max-w-md">
                        <div className="text-red-500 mb-2">⚠️</div>
                        <p className="text-slate-700 font-medium mb-2">카카오맵을 불러올 수 없습니다</p>
                        <p className="text-sm text-slate-600 mb-4">{error}</p>
                        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
                            <p className="font-semibold mb-1">해결 방법:</p>
                            <ol className="list-decimal list-inside space-y-1 text-left">
                                <li>Kakao Developers (https://developers.kakao.com/)에서 JavaScript 키 발급</li>
                                <li>index.html의 YOUR_KAKAO_API_KEY를 실제 키로 교체</li>
                                <li>페이지 새로고침</li>
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

