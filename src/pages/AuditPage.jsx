import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import AuditType from '../components/AuditType';
import AuditGroup from '../components/AuditGroup';
import AuditNo from '../components/AuditNo';

function AuditPage() {
  const navigate = useNavigate();
  const [auditTypeId, setAuditTypeId] = useState(localStorage.getItem('audit_type_id') || null);
  const [auditID] = useState(localStorage.getItem('AUDIT_ID') || null);

  useEffect(() => {
    const selectedPlant = localStorage.getItem('selectedPlant');
    if (!selectedPlant) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'audit_type_id') {
        setAuditTypeId(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [auditTypeId]); // Added auditTypeId as a dependency

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'audit_type_id') {
        setAuditTypeId(event.newValue);
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Remove auditTypeId from dependencies array
  
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'AUDIT_ID') {
        console.log('AUDIT_ID changed:', event.newValue);
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Remove auditID from dependencies array
  

  // Optimized with consistent naming and early return
  if (!auditTypeId) {
    return (
      <Layout>
        <AuditType />
      </Layout>
    );
  }

  if (!auditID) {
    return (
      <Layout>
        <AuditNo />
      </Layout>
    );
  }

  return (
    <Layout>
      <AuditGroup />
    </Layout>
  );
}

export default AuditPage;
