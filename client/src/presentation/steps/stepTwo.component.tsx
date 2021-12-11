import React from 'react';
import { Box, Typography } from '@mui/material';
import { ReactComponent as Raspberry } from 'presentation/assets/raspberryPi3.svg';

export const StepTwo: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& .table': {
          borderCollapse: 'collapse',
          borderSpacing: 0,
          display: 'table',
          marginRight: 1,
        },
        '& tr td': {
          textAlign: 'center',
        },
        '& .w3-red': {
          backgroundColor: '#f44336',
        },
        '& .w3-green': {
          backgroundColor: '#4CAF50',
        },
        '& .w3-blue': {
          backgroundColor: '#2196F3',
        },
        '& .w3-gray': {
          backgroundColor: '#9e9e9e',
        },
        '& .w3-khaki': {
          backgroundColor: '#f0e68c',
        },
        '& .w3-black': {
          backgroundColor: '#000',
        },
        '& .w3-orange': {
          backgroundColor: '#ff9800',
        },
      }}
    >
      <Box sx={{ width: '100%', marginRight: 1 }}>
        <Typography sx={{ mt: 2, mb: 1 }} component="h2" variant="h4">
          Instruções:
        </Typography>
        <ol>
          <li>
            <Typography>
              Conecte no pino <b>"GPIO 4"</b> o relé de acionamento do cilindro
              <b>"A"</b>
            </Typography>
          </li>
          <li>
            <Typography>
              Conecte no pino <b>"GPIO 17"</b> o relé de acionamento do cilindro
              <b>"B"</b>
            </Typography>
          </li>
          <li>
            <Typography>
              Conecte no pino <b>"GPIO 5"</b> o sensor de inicio de curso do
              cilindro <b>"A"</b>
            </Typography>
          </li>
          <li>
            <Typography>
              Conecte no pino <b>"GPIO 13"</b> o sensor de fim de curso do
              cilindro <b>"A"</b>
            </Typography>
          </li>
          <li>
            <Typography>
              Conecte no pino <b>"GPIO 19"</b> o sensor de inicio de curso do
              cilindro <b>"B"</b>
            </Typography>
          </li>
          <li>
            <Typography>
              Conecte no pino <b>"GPIO 26"</b> o sensor de fim de curso do
              cilindro <b>"B"</b>
            </Typography>
          </li>
        </ol>
      </Box>
      <Typography sx={{ mt: 2, mb: 1 }} component="h6" variant="h6">
        Raspberry 3 - Pinos
      </Typography>
      <Box
        sx={{
          display: 'flex',
          maxWidth: 800,
        }}
      >
        <table className="table" style={{ width: 600 }}>
          <tbody>
            <tr>
              <td style={{ width: '40%' }} className="w3-red">
                3V3
              </td>
              <td style={{ width: '10%' }}>1</td>
              <td style={{ width: '10%' }}>2</td>
              <td style={{ width: '40%' }} className="w3-red">
                5V
              </td>
            </tr>
            <tr>
              <td className="w3-green">GPIO 2</td>
              <td>3</td>
              <td>4</td>
              <td className="w3-red">5V</td>
            </tr>
            <tr>
              <td className="w3-green">GPIO 3</td>
              <td>5</td>
              <td>6</td>
              <td className="w3-blue">GND</td>
            </tr>
            <tr>
              <td className="w3-khaki">GPIO 4</td>
              <td>7</td>
              <td>8</td>
              <td className="w3-gray">GPIO 14</td>
            </tr>
            <tr>
              <td className="w3-blue">GND</td>
              <td>9</td>
              <td>10</td>
              <td className="w3-gray">GPIO 15</td>
            </tr>
            <tr>
              <td className="w3-khaki">GPIO 17</td>
              <td>11</td>
              <td>12</td>
              <td className="w3-khaki">GPIO 18</td>
            </tr>
            <tr>
              <td className="w3-khaki">GPIO 27</td>
              <td>13</td>
              <td>14</td>
              <td className="w3-blue">GND</td>
            </tr>
            <tr>
              <td className="w3-khaki">GPIO 22</td>
              <td>15</td>
              <td>16</td>
              <td className="w3-khaki">GPIO 23</td>
            </tr>
            <tr>
              <td className="w3-red">3V3</td>
              <td>17</td>
              <td>18</td>
              <td className="w3-khaki">GPIO 24</td>
            </tr>
            <tr>
              <td className="w3-orange">GPIO 10</td>
              <td>19</td>
              <td>20</td>
              <td className="w3-blue">GND</td>
            </tr>
            <tr>
              <td className="w3-orange">GPIO 9</td>
              <td>21</td>
              <td>22</td>
              <td className="w3-khaki">GPIO 25</td>
            </tr>
            <tr>
              <td className="w3-orange">GPIO 11</td>
              <td>23</td>
              <td>24</td>
              <td className="w3-orange">GPIO 8</td>
            </tr>
            <tr>
              <td className="w3-blue">GND</td>
              <td>25</td>
              <td>26</td>
              <td className="w3-orange">GPIO 7</td>
            </tr>
            <tr>
              <td className="w3-black">DNC</td>
              <td>27</td>
              <td>28</td>
              <td className="w3-black">DNC</td>
            </tr>
            <tr>
              <td className="w3-khaki">GPIO 5</td>
              <td>29</td>
              <td>30</td>
              <td className="w3-blue">GND</td>
            </tr>
            <tr>
              <td className="w3-khaki">GPIO 6</td>
              <td>31</td>
              <td>32</td>
              <td className="w3-khaki">GPIO 12</td>
            </tr>
            <tr>
              <td className="w3-khaki">GPIO 13</td>
              <td>33</td>
              <td>34</td>
              <td className="w3-blue">GND</td>
            </tr>
            <tr>
              <td className="w3-khaki">GPIO 19</td>
              <td>35</td>
              <td>36</td>
              <td className="w3-khaki">GPIO 16</td>
            </tr>
            <tr>
              <td className="w3-khaki">GPIO 26</td>
              <td>37</td>
              <td>38</td>
              <td className="w3-khaki">GPIO 20</td>
            </tr>
            <tr>
              <td className="w3-blue">GND</td>
              <td>39</td>
              <td>40</td>
              <td className="w3-khaki">GPIO 21</td>
            </tr>
          </tbody>
        </table>
        <Raspberry />
      </Box>
    </Box>
  );
};
