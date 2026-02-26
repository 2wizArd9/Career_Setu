import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Modal } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';
import Layout from '../../components/layout/Layout';

const MentorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading } = useAppData();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [bookingStep, setBookingStep] = useState<'calendar' | 'confirm' | 'success'>('calendar');

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-body text-text-secondary">Failed to load mentor data</p>
        </div>
      </Layout>
    );
  }

  const { mentors } = data;
  const mentor = mentors.find(m => m.id === id);

  if (!mentor) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-heading-2 font-semibold text-text-primary mb-4">Mentor Not Found</h1>
          <Button onClick={() => navigate('/mentors')}>Back to Mentors</Button>
        </div>
      </Layout>
    );
  }

  const handleBookSession = () => {
    setIsBookingModalOpen(true);
    setBookingStep('calendar');
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    setBookingStep('confirm');
  };

  const handleConfirmBooking = () => {
    setBookingStep('success');
    // Simulate booking process
    setTimeout(() => {
      setIsBookingModalOpen(false);
      setBookingStep('calendar');
      setSelectedTimeSlot('');
    }, 3000);
  };

  const closeModal = () => {
    setIsBookingModalOpen(false);
    setBookingStep('calendar');
    setSelectedTimeSlot('');
  };

  // Mock calendar data
  const mockCalendarSlots = [
    { day: 'Monday', date: '18 Oct', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
    { day: 'Tuesday', date: '19 Oct', slots: ['11:00 AM', '3:00 PM'] },
    { day: 'Wednesday', date: '20 Oct', slots: ['9:00 AM', '1:00 PM', '5:00 PM'] },
    { day: 'Thursday', date: '21 Oct', slots: ['10:00 AM', '2:00 PM'] },
    { day: 'Friday', date: '22 Oct', slots: ['11:00 AM', '4:00 PM'] },
  ];

  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/mentors')}
            className="text-primary-blue hover:underline text-body"
          >
            ← Back to Mentors
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <Card>
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-heading-1 font-bold">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-heading-1 font-bold text-text-primary mb-2">
                    {mentor.name}
                  </h1>
                  <p className="text-body-large text-text-secondary mb-3">
                    {mentor.title}
                  </p>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(mentor.rating))}
                        {mentor.rating % 1 !== 0 && '☆'}
                      </div>
                      <span className="text-body font-medium text-text-primary">
                        {mentor.rating}
                      </span>
                    </div>
                    <div className="text-body text-text-secondary">
                      {mentor.experience} experience
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-body-small text-success font-medium">Available</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-primary-blue text-body-small rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* About Section */}
            <Card title="About">
              <p className="text-body text-text-primary leading-relaxed">
                {mentor.bio}
              </p>
            </Card>

            {/* Expertise & Experience */}
            <Card title="Expertise & Experience">
              <div className="space-y-6">
                <div>
                  <h4 className="text-body font-semibold text-text-primary mb-3">Areas of Expertise</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mentor.expertise.map((area, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-body text-text-primary">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-body font-semibold text-text-primary mb-3">What You'll Get</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-primary-blue mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-body text-text-primary">Personalized career guidance and strategy</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-primary-blue mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-body text-text-primary">Industry insights and market trends</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-primary-blue mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-body text-text-primary">Resume and interview preparation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-primary-blue mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-body text-text-primary">Networking and professional development tips</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Reviews Section */}
            <Card title="Recent Reviews">
              <div className="space-y-6">
                {[
                  {
                    name: "Sarah K.",
                    rating: 5,
                    comment: "Excellent guidance on transitioning to product management. Very insightful and practical advice.",
                    date: "2 weeks ago"
                  },
                  {
                    name: "Michael R.",
                    rating: 5,
                    comment: "Great mentor! Helped me understand the industry landscape and provided clear next steps.",
                    date: "1 month ago"
                  },
                  {
                    name: "Priya S.",
                    rating: 4,
                    comment: "Very knowledgeable and patient. Gave me confidence to pursue my career goals.",
                    date: "1 month ago"
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b border-border-light pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-body font-medium text-text-primary">{review.name}</span>
                        <div className="flex text-yellow-400">
                          {'★'.repeat(review.rating)}
                        </div>
                      </div>
                      <span className="text-body-small text-text-secondary">{review.date}</span>
                    </div>
                    <p className="text-body text-text-primary">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card title="Book a Session">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-heading-2 font-bold text-text-primary mb-1">
                    {mentor.sessionFee}
                  </div>
                  <div className="text-body-small text-text-secondary">per 1-hour session</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-amber-200">
                  <h4 className="text-body font-semibold text-text-primary mb-2">Session Includes:</h4>
                  <ul className="text-body-small text-text-secondary space-y-1">
                    <li>• 60-minute video call</li>
                    <li>• Personalized action plan</li>
                    <li>• Follow-up resources</li>
                    <li>• Email support for 1 week</li>
                  </ul>
                </div>

                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full"
                  onClick={handleBookSession}
                >
                  Book Session Now
                </Button>

                <div className="text-center">
                  <p className="text-body-small text-text-secondary">
                    Free cancellation up to 24 hours before
                  </p>
                </div>
              </div>
            </Card>

            {/* Availability */}
            <Card title="Availability">
              <div className="space-y-3">
                <h4 className="text-body font-medium text-text-primary">Next Available Slots:</h4>
                {mentor.availability.slice(0, 3).map((slot, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-amber-200">
                    <span className="text-body-small text-text-primary">{slot}</span>
                    <span className="text-body-small text-success font-medium">Available</span>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={handleBookSession}
                >
                  View All Slots
                </Button>
              </div>
            </Card>

            {/* Contact Info */}
            <Card title="Quick Actions">
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/mentors')}
                >
                  Browse Other Mentors
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/careers')}
                >
                  Explore Career Paths
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Booking Modal */}
        <Modal
          isOpen={isBookingModalOpen}
          onClose={closeModal}
          title={
            bookingStep === 'calendar' ? 'Select Time Slot' :
            bookingStep === 'confirm' ? 'Confirm Booking' :
            'Booking Confirmed!'
          }
          className="max-w-2xl"
        >
          {bookingStep === 'calendar' && (
            <div className="space-y-6">
              <p className="text-body text-text-secondary">
                Choose a convenient time slot for your session with {mentor.name}
              </p>
              
              <div className="grid gap-4">
                {mockCalendarSlots.map((daySlots, dayIndex) => (
                  <div key={dayIndex} className="border border-border-light rounded-lg p-4">
                    <h4 className="text-body font-semibold text-text-primary mb-3">
                      {daySlots.day}, {daySlots.date}
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {daySlots.slots.map((slot, slotIndex) => (
                        <button
                          key={slotIndex}
                          onClick={() => handleTimeSlotSelect(`${daySlots.day}, ${daySlots.date} at ${slot}`)}
                          className="px-3 py-2 border border-primary-blue text-primary-blue rounded-lg hover:bg-primary-blue hover:text-white transition-colors text-body-small"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {bookingStep === 'confirm' && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-body font-semibold text-text-primary mb-2">Session Details</h4>
                <div className="space-y-2 text-body-small">
                  <div><strong>Mentor:</strong> {mentor.name}</div>
                  <div><strong>Time:</strong> {selectedTimeSlot}</div>
                  <div><strong>Duration:</strong> 60 minutes</div>
                  <div><strong>Fee:</strong> {mentor.sessionFee}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-body font-medium text-text-primary mb-2">
                    What would you like to discuss? (Optional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    rows={3}
                    placeholder="Brief description of topics you'd like to cover..."
                  />
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setBookingStep('calendar')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleConfirmBooking}
                    className="flex-1"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </div>
          )}

          {bookingStep === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-heading-3 font-semibold text-text-primary mb-2">
                  Session Booked Successfully!
                </h3>
                <p className="text-body text-text-secondary">
                  You'll receive a confirmation email with the meeting link shortly.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg text-left">
                <h4 className="text-body font-semibold text-text-primary mb-2">Next Steps:</h4>
                <ul className="text-body-small text-text-secondary space-y-1">
                  <li>• Check your email for confirmation and meeting details</li>
                  <li>• Add the session to your calendar</li>
                  <li>• Prepare any questions you'd like to discuss</li>
                  <li>• Join the video call 5 minutes early</li>
                </ul>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default MentorProfilePage;