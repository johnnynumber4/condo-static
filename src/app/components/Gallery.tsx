'use client';
import * as React from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { galleryPhotos as photos, type Photo } from '../lib/gallery';

function Tile({
  photo,
  featured,
  onOpen,
}: {
  photo: Photo;
  featured: boolean;
  onOpen: () => void;
}) {
  return (
    <Box
      component="button"
      onClick={onOpen}
      aria-label={`View photo: ${photo.alt}`}
      sx={{
        position: 'relative',
        border: 0,
        p: 0,
        cursor: 'zoom-in',
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        aspectRatio: featured ? { xs: '4 / 3', md: '16 / 9' } : '4 / 3',
        gridColumn: featured ? { xs: 'span 1', md: 'span 2' } : 'span 1',
        '&:hover img': { transform: 'scale(1.04)' },
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 900px) 100vw, 66vw"
        style={{
          objectFit: 'cover',
          transition: 'transform .5s ease',
        }}
      />
      {photo.caption && (
        <Box
          sx={{
            position: 'absolute',
            insetInline: 0,
            bottom: 0,
            p: 2,
            textAlign: 'left',
            color: '#fff',
            background:
              'linear-gradient(to top, rgba(9,24,29,0.78), transparent)',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {photo.caption}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default function Gallery() {
  const [active, setActive] = React.useState<Photo | null>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (photos.length === 0) return null;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 7, md: 10 },
        bgcolor: 'background.paper',
        borderBlock: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', display: 'block', mb: 1.5 }}
        >
          A look around
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, maxWidth: 620 }}
        >
          The view we keep coming back for.
        </Typography>

        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              md: photos.length === 1 ? '1fr' : 'repeat(2, 1fr)',
            },
          }}
        >
          {photos.map((photo, i) => (
            <Tile
              key={photo.src}
              photo={photo}
              featured={i === 0}
              onOpen={() => setActive(photo)}
            />
          ))}
        </Box>
      </Container>

      <Dialog
        open={active !== null}
        onClose={() => setActive(null)}
        maxWidth="lg"
        fullScreen={fullScreen}
        slotProps={{
          paper: { sx: { bgcolor: '#0B1519', overflow: 'hidden' } },
        }}
      >
        <IconButton
          onClick={() => setActive(null)}
          aria-label="Close photo"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.4)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
          }}
        >
          <CloseIcon />
        </IconButton>
        {active && (
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100vw', sm: '80vw' },
              height: { xs: '100dvh', sm: '76vh' },
            }}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
            />
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
