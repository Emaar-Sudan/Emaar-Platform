import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useLanguage } from '@/contexts/LanguageContext';
import MapFilters from '@/components/map/MapFilters';
import MapLegend from '@/components/map/MapLegend';
import MapMarker from '@/components/map/MapMarker';
import { useMapData } from '@/hooks/useMapData';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import type { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    projects: true,
    tenders: true,
    auctions: true,
    jobs: true,
  });

  const { data, isLoading } = useMapData();
  const center: LatLngTuple = [15.5007, 32.5599];

  const markers = useMemo(() => {
    if (!data) return [];
    
    const allMarkers = [];

    if (filters.projects) {
      allMarkers.push(...data.projects.map((project: any) => ({
        type: 'project',
        item: project,
        position: project.coordinates
      })));
    }

    if (filters.tenders) {
      allMarkers.push(...data.tenders.map((tender: any) => ({
        type: 'tender',
        item: tender,
        position: tender.coordinates
      })));
    }

    if (filters.auctions) {
      allMarkers.push(...data.auctions.map((auction: any) => ({
        type: 'auction',
        item: auction,
        position: auction.coordinates
      })));
    }

    if (filters.jobs) {
      allMarkers.push(...data.jobs.map((job: any) => ({
        type: 'job',
        item: job,
        position: job.coordinates
      })));
    }

    return allMarkers;
  }, [data, filters]);

  if (isLoading) {
    return <LoadingScreen message={t('map.loading')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('map.title')}</h1>
          <p className="text-gray-600">{t('map.description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <MapFilters filters={filters} onFilterChange={setFilters} />
            <MapLegend />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-4 h-[800px]">
              <MapContainer
                center={center}
                zoom={6}
                className="w-full h-full rounded-lg"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers.map((marker, index) => (
                  <MapMarker
                    key={`${marker.type}-${index}`}
                    type={marker.type}
                    item={marker.item}
                    position={marker.position}
                  />
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;