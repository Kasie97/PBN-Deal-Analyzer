import {
  useState,
  ChangeEvent,
  FormEvent
} from 'react';

import type { DealData } from '../utils/types';

interface Props {
  onSubmit: (data: DealData) => void;
}

export default function DealForm({
  onSubmit
}: Props) {
  const [formData, setFormData] =
    useState<DealData>({
      dealSize: '',
      role: '',
      industry: '',
      stage: '',
      challenge: '',
      timelineMonths: '',
      closeDate: '',
      decisionMaker: '',
      stakeholders: '',
      budgetStatus: '',
      whatYouTried: '',
      competitor: '',
      additionalContext: ''
    });

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-fade-in"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          Enterprise Deal Intake
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="number"
            name="dealSize"
            placeholder="Deal Size"
            value={formData.dealSize}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Your Role"
            value={formData.role}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            type="text"
            name="stage"
            placeholder="Current Deal Stage"
            value={formData.stage}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            type="text"
            name="timelineMonths"
            placeholder="Timeline"
            value={formData.timelineMonths}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="date"
            name="closeDate"
            value={formData.closeDate}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="text"
            name="decisionMaker"
            placeholder="Decision Maker"
            value={formData.decisionMaker}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="text"
            name="budgetStatus"
            placeholder="Budget Status"
            value={formData.budgetStatus}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />
        </div>

        <textarea
          name="challenge"
          placeholder="Primary Deal Challenge"
          value={formData.challenge}
          onChange={handleChange}
          rows={5}
          className="w-full border rounded-xl px-4 py-3 mt-5"
          required
        />

        <textarea
          name="stakeholders"
          placeholder="Stakeholders / blockers"
          value={formData.stakeholders}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-xl px-4 py-3 mt-5"
        />

        <textarea
          name="whatYouTried"
          placeholder="What have you already tried?"
          value={formData.whatYouTried}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-xl px-4 py-3 mt-5"
        />

        <textarea
          name="competitor"
          placeholder="Competitors involved"
          value={formData.competitor}
          onChange={handleChange}
          rows={2}
          className="w-full border rounded-xl px-4 py-3 mt-5"
        />

        <textarea
          name="additionalContext"
          placeholder="Additional context"
          value={formData.additionalContext}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-xl px-4 py-3 mt-5"
        />

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl font-bold text-lg"
        >
          Analyze Deal with AI
        </button>
      </div>
    </form>
  );
}
